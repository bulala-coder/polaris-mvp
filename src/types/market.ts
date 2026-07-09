export type MarketRiskLevel = 1 | 2 | 3 | 4 | 5

export type MarketDataConfidenceLevel = 'low' | 'medium' | 'high'

export type MarketCategoryScoreKey =
  | 'valuation'
  | 'momentum'
  | 'volatility'
  | 'interestRate'
  | 'businessCycle'
  | 'creditRisk'
  | 'sentiment'

export type MarketCategoryScore = {
  key: MarketCategoryScoreKey
  label: string
  description: string
  score: number
  weight: number
}

export type MarketScore = {
  valuationScore: number
  momentumScore: number
  volatilityScore: number
  interestRateScore: number
  businessCycleScore: number
  creditRiskScore: number
  sentimentScore: number
  dataConfidenceLevel: MarketDataConfidenceLevel
  marketRiskScore: number
  marketRiskLevel: MarketRiskLevel
  marketRiskLabel: string
  categoryScores: MarketCategoryScore[]
  mainRiskDrivers: MarketCategoryScore[]
}
