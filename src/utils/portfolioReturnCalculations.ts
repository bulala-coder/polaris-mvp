import type { GoalSettings } from '../types/goal'
import { normalizeAllocation } from './allocationCalculations'

export interface PortfolioReturnAssumptions {
  stockReturn: number
  leveragedStockReturn: number
  bondReturn: number
  cashReturn: number
}

export const defaultPortfolioReturnAssumptions: PortfolioReturnAssumptions = {
  stockReturn: 0.06,
  leveragedStockReturn: 0.08,
  bondReturn: 0.03,
  cashReturn: 0.01,
}

export function calculatePortfolioExpectedReturn(
  goal: GoalSettings,
  assumptions = defaultPortfolioReturnAssumptions,
) {
  const normalizedAllocation = normalizeAllocation(goal)
  const expectedAnnualReturn =
    normalizedAllocation.stockWeight * assumptions.stockReturn +
    normalizedAllocation.leveragedStockWeight *
      assumptions.leveragedStockReturn +
    normalizedAllocation.bondWeight * assumptions.bondReturn +
    normalizedAllocation.cashWeight * assumptions.cashReturn

  return {
    expectedAnnualReturn,
    expectedAnnualReturnPercent: expectedAnnualReturn * 100,
    normalizedWeights: {
      stockWeight: normalizedAllocation.stockWeight,
      leveragedStockWeight: normalizedAllocation.leveragedStockWeight,
      bondWeight: normalizedAllocation.bondWeight,
      cashWeight: normalizedAllocation.cashWeight,
    },
    wasNormalized: normalizedAllocation.wasNormalized,
    helperText:
      normalizedAllocation.wasNormalized
        ? '這是根據你填寫的股票、槓桿股票、債券與現金佔比，加上 Polaris 內建的長期假設報酬率計算出的加權結果。它不是市場預測，也不是保證報酬。如果佔比合計不是 100%，Polaris 會先正規化後再計算。'
        : '這是根據你填寫的股票、槓桿股票、債券與現金佔比，加上 Polaris 內建的長期假設報酬率計算出的加權結果。它不是市場預測，也不是保證報酬。',
  }
}
