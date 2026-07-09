export type MarketRiskLevel = 1 | 2 | 3 | 4 | 5

export type DataConfidenceLevel = 'low' | 'medium' | 'high'

export type MarketDataConfidenceLevel = DataConfidenceLevel

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
  value: number
  helperText: string
  description: string
  score: number
  weight: number
}

export type MarketInput = {
  valuationScore: number
  momentumScore: number
  volatilityScore: number
  interestRateScore: number
  businessCycleScore: number
  creditRiskScore: number
  sentimentScore: number
  dataConfidenceLevel: DataConfidenceLevel
}

export type MarketScore = MarketInput & {
  marketRiskScore: number
  marketRiskLevel: MarketRiskLevel
  dataConfidenceLevel: DataConfidenceLevel
  categoryScores: MarketCategoryScore[]
  mainRiskDrivers: MarketCategoryScore[]
  marketRiskLabel: string
}
