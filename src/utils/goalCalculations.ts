import type { GoalSettings } from '../types/goal'

type SuggestedExposureParams = {
  marketRiskLevel: number
  maxExposure: number
}

export function calculateGoalProgress(goal: GoalSettings) {
  if (goal.targetNetWorth <= 0) {
    return {
      progressRatio: 0,
      progressPercent: 0,
      remainingAmount: 0,
    }
  }

  const progressRatio = goal.currentNetWorth / goal.targetNetWorth
  const progressPercent = Math.min(100, Math.max(0, progressRatio * 100))
  const remainingAmount = Math.max(
    goal.targetNetWorth - goal.currentNetWorth,
    0,
  )

  return {
    progressRatio,
    progressPercent,
    remainingAmount,
  }
}

export function estimateTimeToGoal(
  goal: GoalSettings,
  expectedAnnualReturnOverride?: number,
) {
  const remainingAmount = goal.targetNetWorth - goal.currentNetWorth
  const expectedAnnualReturn =
    typeof expectedAnnualReturnOverride === 'number'
      ? expectedAnnualReturnOverride
      : goal.expectedAnnualReturn || 0

  if (remainingAmount <= 0) {
    return {
      monthsToGoal: 0,
      label: '已達成',
      helperText: '目前資產已達到或超過目標。可以高興，但別把紀律一起拿去慶祝掉。',
    }
  }

  if (
    goal.monthlyContribution <= 0 &&
    expectedAnnualReturn <= 0 &&
    remainingAmount > 0
  ) {
    return {
      monthsToGoal: null,
      label: '無法估算',
      helperText:
        '目前每月投入為 0，北極星暫時算不出抵達時間。船沒有前進時，再好的羅盤也只能陪你看夜景。',
    }
  }

  let monthsToGoal = Math.ceil(remainingAmount / goal.monthlyContribution)

  if (expectedAnnualReturn > 0) {
    const monthlyReturn = Math.pow(1 + expectedAnnualReturn, 1 / 12) - 1
    let projectedNetWorth = goal.currentNetWorth
    monthsToGoal = 0

    while (projectedNetWorth < goal.targetNetWorth && monthsToGoal < 1200) {
      projectedNetWorth = projectedNetWorth * (1 + monthlyReturn)
      projectedNetWorth += goal.monthlyContribution
      monthsToGoal += 1
    }

    if (projectedNetWorth < goal.targetNetWorth) {
      return {
        monthsToGoal: null,
        label: '超過 100 年',
        helperText:
          '這是估算，不是承諾。如果市場會乖乖照 Excel 表演出，世界上就不需要風險管理了。',
      }
    }
  }

  const years = Math.floor(monthsToGoal / 12)
  const months = monthsToGoal % 12
  let label = `約 ${months} 個月`

  if (years > 0 && months > 0) {
    label = `約 ${years} 年 ${months} 個月`
  } else if (years > 0) {
    label = `約 ${years} 年`
  }

  return {
    monthsToGoal,
    label,
    helperText:
      expectedAnnualReturn > 0
        ? '這是估算，不是承諾。如果市場會乖乖照 Excel 表演出，世界上就不需要風險管理了。'
        : '這是以目前每月投入估算的靜態時間，不包含投資報酬率、通膨或市場波動。',
  }
}

export function calculateSuggestedExposure({
  marketRiskLevel,
  maxExposure,
}: SuggestedExposureParams) {
  const safeMaxExposure = maxExposure > 0 ? maxExposure : 1.5
  const exposureMultipliers: Record<number, number> = {
    1: 1,
    2: 0.93,
    3: 0.8,
    4: 0.6,
    5: 0.4,
  }
  const labels: Record<number, string> = {
    1: '可接近最高曝險',
    2: '可維持偏高曝險',
    3: '建議中度曝險',
    4: '建議降低曝險',
    5: '建議防守曝險',
  }
  const safeMarketRiskLevel = Math.min(5, Math.max(1, marketRiskLevel))
  const suggestedExposure =
    safeMaxExposure * exposureMultipliers[safeMarketRiskLevel]
  const suggestedExposurePercent = Math.round(suggestedExposure * 100)

  return {
    suggestedExposure,
    suggestedExposurePercent,
    label: labels[safeMarketRiskLevel],
    helperText:
      '建議曝險是依市場風險等級與你的最高曝險上限計算，用於風險控管，不代表市場預測、個股推薦或短線買賣訊號。',
  }
}
