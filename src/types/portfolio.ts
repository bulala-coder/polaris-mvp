export type PortfolioAsset = {
  ticker: string
  name: string
  currentValue: number
  targetWeight: number
  exposureMultiplier: number
  currentWeight: number
  drift: number
}

export type Portfolio = {
  assets: PortfolioAsset[]
  totalValue: number
  totalDrift: number
  effectiveExposure: number
  targetExposure: number
  exposureGap: number
  cashRatio: number
}
