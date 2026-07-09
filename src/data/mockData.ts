import type { DailyDecision } from '../types/decision'

export const mockDailyDecision: DailyDecision = {
  decisionLabel: '維持策略',
  decisionSummary: '今天不需要改變長期策略',
  marketRiskLevel: 3,
  marketRiskLabel: '中性偏高',
  portfolioStatus: '配置輕微偏離',
  recommendedAction: '維持原定長期策略，用新資金微調配置',
  notRecommendedAction: '不要因短期新聞或單日波動大幅改變策略',
}
