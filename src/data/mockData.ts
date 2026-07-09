import type { DailyDecision } from '../types/decision'
import type {
  MarketCategoryScore,
  MarketRiskLevel,
  MarketScore,
} from '../types/market'
import type { Portfolio, PortfolioAsset } from '../types/portfolio'

export const mockDailyDecision: DailyDecision = {
  decisionLabel: '維持策略',
  decisionSummary: '今天不需要改變長期策略',
  marketRiskLevel: 3,
  marketRiskLabel: '中性偏高',
  portfolioStatus: '配置輕微偏離',
  recommendedAction: '維持原定長期策略，用新資金微調配置',
  notRecommendedAction: '不要因短期新聞或單日波動大幅改變策略',
}

const portfolioAssetInputs = [
  {
    ticker: '00662',
    name: '全球股票 ETF',
    currentValue: 8000000,
    targetWeight: 0.4,
    exposureMultiplier: 1,
  },
  {
    ticker: '00631L',
    name: '槓桿股票 ETF',
    currentValue: 8000000,
    targetWeight: 0.4,
    exposureMultiplier: 2,
  },
  {
    ticker: '00835B',
    name: '債券 ETF',
    currentValue: 3000000,
    targetWeight: 0.15,
    exposureMultiplier: 0.3,
  },
  {
    ticker: '現金',
    name: '現金',
    currentValue: 1000000,
    targetWeight: 0.05,
    exposureMultiplier: 0,
  },
]

const totalValue = portfolioAssetInputs.reduce(
  (sum, asset) => sum + asset.currentValue,
  0,
)

const assets: PortfolioAsset[] = portfolioAssetInputs.map((asset) => {
  const currentWeight = asset.currentValue / totalValue

  return {
    ...asset,
    currentWeight,
    drift: currentWeight - asset.targetWeight,
  }
})

export const mockPortfolio: Portfolio = {
  assets,
  totalValue,
  totalDrift: assets.reduce((sum, asset) => sum + Math.abs(asset.drift), 0),
  effectiveExposure: assets.reduce(
    (sum, asset) => sum + asset.currentWeight * asset.exposureMultiplier,
    0,
  ),
  targetExposure: assets.reduce(
    (sum, asset) => sum + asset.targetWeight * asset.exposureMultiplier,
    0,
  ),
  exposureGap:
    assets.reduce(
      (sum, asset) => sum + asset.currentWeight * asset.exposureMultiplier,
      0,
    ) -
    assets.reduce(
      (sum, asset) => sum + asset.targetWeight * asset.exposureMultiplier,
      0,
    ),
  cashRatio: assets.find((asset) => asset.ticker === '現金')?.currentWeight ?? 0,
}

const categoryScores: MarketCategoryScore[] = [
  {
    key: 'valuation',
    label: 'Valuation',
    description: '估值',
    score: 70,
    weight: 0.2,
  },
  {
    key: 'momentum',
    label: 'Momentum',
    description: '動能',
    score: 55,
    weight: 0.15,
  },
  {
    key: 'volatility',
    label: 'Volatility',
    description: '波動度',
    score: 65,
    weight: 0.15,
  },
  {
    key: 'interestRate',
    label: 'Interest Rate',
    description: '利率環境',
    score: 60,
    weight: 0.15,
  },
  {
    key: 'businessCycle',
    label: 'Business Cycle',
    description: '景氣循環',
    score: 45,
    weight: 0.15,
  },
  {
    key: 'creditRisk',
    label: 'Credit Risk',
    description: '信用風險',
    score: 50,
    weight: 0.1,
  },
  {
    key: 'sentiment',
    label: 'Sentiment',
    description: '市場情緒',
    score: 75,
    weight: 0.1,
  },
]

const marketRiskScore = categoryScores.reduce(
  (sum, category) => sum + category.score * category.weight,
  0,
)

function getMarketRiskLevel(score: number): MarketRiskLevel {
  if (score <= 20) {
    return 1
  }

  if (score <= 40) {
    return 2
  }

  if (score < 61) {
    return 3
  }

  if (score <= 80) {
    return 4
  }

  return 5
}

function getMarketRiskLabel(level: MarketRiskLevel) {
  const labels: Record<MarketRiskLevel, string> = {
    1: '低風險',
    2: '中性偏低',
    3: '中性偏高',
    4: '高風險',
    5: '極高風險',
  }

  return labels[level]
}

const marketRiskLevel = getMarketRiskLevel(marketRiskScore)

export const mockMarketScore: MarketScore = {
  valuationScore: 70,
  momentumScore: 55,
  volatilityScore: 65,
  interestRateScore: 60,
  businessCycleScore: 45,
  creditRiskScore: 50,
  sentimentScore: 75,
  dataConfidenceLevel: 'medium',
  marketRiskScore,
  marketRiskLevel,
  marketRiskLabel: getMarketRiskLabel(marketRiskLevel),
  categoryScores,
  mainRiskDrivers: [...categoryScores]
    .sort((first, second) => second.score - first.score)
    .slice(0, 3),
}
