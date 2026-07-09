export type PortfolioAsset = {
  id: string
  ticker: string
  name: string
  assetType: string
  currentValue: number
  targetWeight: number
  exposureMultiplier: number
  currentWeight?: number
  drift?: number
}

export type Portfolio = {
  assets: PortfolioAsset[]
  totalValue: number
  effectiveExposure: number
  targetExposure: number
  exposureGap: number
  totalDrift: number
  cashRatio: number
}
