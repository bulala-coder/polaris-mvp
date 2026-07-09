import type { Portfolio, PortfolioAsset } from '../types/portfolio'

function isCashAsset(asset: PortfolioAsset) {
  const assetType = asset.assetType.toLowerCase()
  const name = asset.name.toLowerCase()

  return assetType.includes('cash') || name.includes('cash') || name.includes('現金')
}

export function calculatePortfolioMetrics(
  inputAssets: PortfolioAsset[],
): Portfolio {
  const totalValue = inputAssets.reduce(
    (sum, asset) => sum + asset.currentValue,
    0,
  )

  const assets = inputAssets.map((asset) => {
    const currentWeight = totalValue > 0 ? asset.currentValue / totalValue : 0

    return {
      ...asset,
      currentWeight,
      drift: currentWeight - asset.targetWeight,
    }
  })

  const totalDrift =
    assets.reduce((sum, asset) => sum + Math.abs(asset.drift ?? 0), 0) / 2

  const effectiveExposure = assets.reduce(
    (sum, asset) => sum + (asset.currentWeight ?? 0) * asset.exposureMultiplier,
    0,
  )

  const targetExposure = assets.reduce(
    (sum, asset) => sum + asset.targetWeight * asset.exposureMultiplier,
    0,
  )

  const cashRatio = assets
    .filter(isCashAsset)
    .reduce((sum, asset) => sum + (asset.currentWeight ?? 0), 0)

  return {
    assets,
    totalValue,
    effectiveExposure,
    targetExposure,
    exposureGap: effectiveExposure - targetExposure,
    totalDrift,
    cashRatio,
  }
}
