import type { MarketRiskLevel } from './market'

export type DailyDecision = {
  decisionLabel: string
  decisionSummary: string
  marketRiskLevel: MarketRiskLevel
  marketRiskLabel: string
  portfolioStatus: string
  recommendedAction: string
  notRecommendedAction: string
}
