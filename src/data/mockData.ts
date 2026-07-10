import type { DailyDecision } from '../types/decision'
import type { MarketInput } from '../types/market'
import type { PortfolioAsset } from '../types/portfolio'
import type { ReflectionEntry } from '../types/reflection'
import { buildMarketScore } from '../utils/marketCalculations'
import { calculatePortfolioMetrics } from '../utils/portfolioCalculations'

export const mockDailyDecision: DailyDecision = {
  decisionLabel: '維持策略',
  decisionSummary: '今天不需要改變長期策略',
  marketRiskLevel: 3,
  marketRiskLabel: '中性偏高',
  portfolioStatus: '配置輕微偏離',
  recommendedAction: '維持原定長期策略，用新資金微調配置',
  notRecommendedAction: '不要因短期新聞或單日波動大幅改變策略',
}

const portfolioAssetInputs: PortfolioAsset[] = [
  {
    id: 'global-stock-etf',
    ticker: '00662',
    name: '全球股票 ETF',
    assetType: 'stock',
    currentValue: 8000000,
    targetWeight: 0.4,
    exposureMultiplier: 1,
  },
  {
    id: 'leveraged-stock-etf',
    ticker: '00631L',
    name: '槓桿股票 ETF',
    assetType: 'stock',
    currentValue: 8000000,
    targetWeight: 0.4,
    exposureMultiplier: 2,
  },
  {
    id: 'bond-etf',
    ticker: '00835B',
    name: '債券 ETF',
    assetType: 'bond',
    currentValue: 3000000,
    targetWeight: 0.15,
    exposureMultiplier: 0.3,
  },
  {
    id: 'cash',
    ticker: '現金',
    name: '現金',
    assetType: 'cash',
    currentValue: 1000000,
    targetWeight: 0.05,
    exposureMultiplier: 0,
  },
]

export const mockPortfolio = calculatePortfolioMetrics(portfolioAssetInputs)

export const mockMarketInput: MarketInput = {
  valuationScore: 70,
  momentumScore: 55,
  volatilityScore: 65,
  interestRateScore: 60,
  businessCycleScore: 45,
  creditRiskScore: 50,
  sentimentScore: 75,
  dataConfidenceLevel: 'medium',
}

export const mockMarketScore = buildMarketScore(mockMarketInput)

export const mockReflectionEntries: ReflectionEntry[] = [
  {
    date: '2026-07-09',
    decisionLabel: '維持策略',
    emotion: 'calm',
    followedStrategy: true,
    note: '今天沒有因為市場新聞而改變策略。',
  },
  {
    date: '2026-07-08',
    decisionLabel: '用新資金微調',
    emotion: 'anxious',
    followedStrategy: true,
    note: '有點擔心波動，但仍按照原本計畫調整。',
  },
]
