export type HoldingType =
  | 'stock'
  | 'leveraged_stock'
  | 'bond'
  | 'cash'
  | 'other'

export interface PortfolioHolding {
  id: string
  name: string
  amount: number
  type: HoldingType
  expectedAnnualReturn: number
  exposureMultiplier: number
  assumptionReason: string
  shares?: number
  currentPrice?: number
  priceUpdatedAt?: string
  returnSource?: 'rule_based' | 'manual' | 'historical_data'
  historicalAnnualReturn?: number
  historicalReturnYears?: number
  historicalDataSource?: string
  historicalDataError?: string
}

export type GoalSettings = {
  currentNetWorth: number
  targetNetWorth: number
  monthlyContribution: number
  maxExposure: number
  expectedAnnualReturn: number
  stockWeight: number
  leveragedStockWeight: number
  bondWeight: number
  cashWeight: number
  holdings: PortfolioHolding[]
}
