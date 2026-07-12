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

export function estimateTimeToGoal(goal: GoalSettings) {
  const remainingAmount = goal.targetNetWorth - goal.currentNetWorth

  if (remainingAmount <= 0) {
    return {
      monthsToGoal: 0,
      label: '已達成',
      helperText: '目前資產已達到或超過目標資產。',
    }
  }

  if (
    goal.monthlyContribution <= 0 &&
    goal.expectedAnnualReturn <= 0 &&
    remainingAmount > 0
  ) {
    return {
      monthsToGoal: null,
      label: '無法估算',
      helperText: '目前每月投入為 0，無法用固定投入估算達標時間。',
    }
  }

  let monthsToGoal = Math.ceil(remainingAmount / goal.monthlyContribution)

  if (goal.expectedAnnualReturn > 0) {
    const monthlyReturn = Math.pow(1 + goal.expectedAnnualReturn, 1 / 12) - 1
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
          '這是根據目前資產、每月投入與預期年化報酬率估算的時間。它不是市場預測，也不保證實際報酬。',
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
      goal.expectedAnnualReturn > 0
        ? '這是根據目前資產、每月投入與預期年化報酬率估算的時間。它不是市場預測，也不保證實際報酬。'
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
