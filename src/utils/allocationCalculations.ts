import type { GoalSettings } from '../types/goal'

export interface NormalizedAllocation {
  stockWeight: number
  leveragedStockWeight: number
  bondWeight: number
  cashWeight: number
  totalWeight: number
  wasNormalized: boolean
}

function toSafeWeight(value: number) {
  if (!Number.isFinite(value) || Number.isNaN(value)) {
    return 0
  }

  return Math.max(value, 0)
}

export function normalizeAllocation(goal: GoalSettings): NormalizedAllocation {
  const stockWeight = toSafeWeight(goal.stockWeight)
  const leveragedStockWeight = toSafeWeight(goal.leveragedStockWeight)
  const bondWeight = toSafeWeight(goal.bondWeight)
  const cashWeight = toSafeWeight(goal.cashWeight)
  const totalWeight =
    stockWeight + leveragedStockWeight + bondWeight + cashWeight
  const wasNormalized = totalWeight > 0 && Math.abs(totalWeight - 1) > 0.001

  if (totalWeight <= 0) {
    return {
      stockWeight: 0,
      leveragedStockWeight: 0,
      bondWeight: 0,
      cashWeight: 0,
      totalWeight,
      wasNormalized,
    }
  }

  return {
    stockWeight: stockWeight / totalWeight,
    leveragedStockWeight: leveragedStockWeight / totalWeight,
    bondWeight: bondWeight / totalWeight,
    cashWeight: cashWeight / totalWeight,
    totalWeight,
    wasNormalized,
  }
}
