import type { MarketScore } from './market'
import type { Portfolio } from './portfolio'
import type { DecisionOutput } from './decisionOutput'
import type { UserPosition } from './userPosition'

export interface DecisionHistoryEntry {
  id: string
  createdAt: string
  decisionLabel: string
  riskLevel: number
  summary: string
  reasons: string[]
  recommendedActions: string[]
  notRecommendedActions: string[]
  trustNotice: string
  portfolioSnapshot: Portfolio
  marketSnapshot: MarketScore
  userPositionSnapshot: UserPosition
}

export type CreateDecisionHistoryEntryInput = {
  decisionOutput: DecisionOutput
  portfolioSnapshot: Portfolio
  marketSnapshot: MarketScore
  userPositionSnapshot: UserPosition
}
