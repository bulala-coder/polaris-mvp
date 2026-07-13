import type { GoalSettings } from '../types/goal'

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

function toSafeWeight(value: number) {
  if (!Number.isFinite(value) || Number.isNaN(value)) {
    return 0
  }

  return Math.max(value, 0)
}

export function calculatePortfolioExpectedReturn(
  goal: GoalSettings,
  assumptions = defaultPortfolioReturnAssumptions,
) {
  const weights = {
    stockWeight: toSafeWeight(goal.stockWeight),
    leveragedStockWeight: toSafeWeight(goal.leveragedStockWeight),
    bondWeight: toSafeWeight(goal.bondWeight),
    cashWeight: toSafeWeight(goal.cashWeight),
  }
  const totalWeight =
    weights.stockWeight +
    weights.leveragedStockWeight +
    weights.bondWeight +
    weights.cashWeight
  const normalizedWeights =
    totalWeight > 0
      ? {
          stockWeight: weights.stockWeight / totalWeight,
          leveragedStockWeight: weights.leveragedStockWeight / totalWeight,
          bondWeight: weights.bondWeight / totalWeight,
          cashWeight: weights.cashWeight / totalWeight,
        }
      : {
          stockWeight: 0,
          leveragedStockWeight: 0,
          bondWeight: 0,
          cashWeight: 0,
        }
  const expectedAnnualReturn =
    normalizedWeights.stockWeight * assumptions.stockReturn +
    normalizedWeights.leveragedStockWeight * assumptions.leveragedStockReturn +
    normalizedWeights.bondWeight * assumptions.bondReturn +
    normalizedWeights.cashWeight * assumptions.cashReturn

  return {
    expectedAnnualReturn,
    expectedAnnualReturnPercent: expectedAnnualReturn * 100,
    normalizedWeights,
    helperText:
      '這是根據你填寫的股票、槓桿股票、債券與現金佔比，加上 Polaris 內建的長期假設報酬率計算出的加權結果。它不是市場預測，也不是保證報酬。',
  }
}
