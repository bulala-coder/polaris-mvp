export type DecisionRiskLevel = 1 | 2 | 3 | 4 | 5

export type DecisionOutput = {
  decisionLabel: string
  riskLevel: DecisionRiskLevel
  summary: string
  reasons: string[]
  recommendedActions: string[]
  notRecommendedActions: string[]
  trustNotice: string
}
