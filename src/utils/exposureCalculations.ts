import type { GoalSettings } from '../types/goal'
import { normalizeAllocation } from './allocationCalculations'
import { calculateSuggestedExposure } from './goalCalculations'

export interface ExposureSummary {
  currentExposure: number
  currentExposurePercent: number
  maxExposure: number
  maxExposurePercent: number
  suggestedExposure: number
  suggestedExposurePercent: number
  exposureGap: number
  helperText: string
}

function toSafeExposure(value: number, fallback: number) {
  if (!Number.isFinite(value) || Number.isNaN(value) || value <= 0) {
    return fallback
  }

  return value
}

export function calculateCurrentExposureFromAllocation(
  goal: GoalSettings,
): number {
  const normalizedAllocation = normalizeAllocation(goal)

  return (
    normalizedAllocation.stockWeight * 1 +
    normalizedAllocation.leveragedStockWeight * 2 +
    normalizedAllocation.bondWeight * 0 +
    normalizedAllocation.cashWeight * 0
  )
}

export function calculateExposureSummary({
  goal,
  marketRiskLevel,
}: {
  goal: GoalSettings
  marketRiskLevel: number
}): ExposureSummary {
  const currentExposure = calculateCurrentExposureFromAllocation(goal)
  const maxExposure = toSafeExposure(goal.maxExposure, 1)
  const suggestedExposure = calculateSuggestedExposure({
    marketRiskLevel,
    maxExposure,
  })

  return {
    currentExposure,
    currentExposurePercent: currentExposure * 100,
    maxExposure,
    maxExposurePercent: maxExposure * 100,
    suggestedExposure: suggestedExposure.suggestedExposure,
    suggestedExposurePercent: suggestedExposure.suggestedExposurePercent,
    exposureGap: currentExposure - suggestedExposure.suggestedExposure,
    helperText:
      '目前曝險率根據你的股票與槓桿股票佔比估算：股票以 1 倍計，槓桿股票以 2 倍計，債券與現金不計入股票曝險。這是簡化估算，不是完整風險模型。',
  }
}
