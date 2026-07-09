import type { DailyDecision } from '../types/decision'
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
