import type { PortfolioHolding } from '../types/goal'

function toSafeNumber(value: number | undefined): number {
  if (typeof value !== 'number' || !Number.isFinite(value) || Number.isNaN(value)) {
    return 0
  }

  return Math.max(value, 0)
}

export function calculateHoldingMarketValue({
  shares,
  currentPrice,
  fallbackAmount,
}: {
  shares?: number
  currentPrice?: number
  fallbackAmount?: number
}): number {
  const hasValidShares =
    typeof shares === 'number' && Number.isFinite(shares) && shares > 0
  const hasValidCurrentPrice =
    typeof currentPrice === 'number' &&
    Number.isFinite(currentPrice) &&
    currentPrice >= 0

  if (hasValidShares && hasValidCurrentPrice) {
    return shares * currentPrice
  }

  return toSafeNumber(fallbackAmount)
}

export function normalizeHoldingValue(
  holding: PortfolioHolding,
): PortfolioHolding {
  return {
    ...holding,
    amount: calculateHoldingMarketValue({
      shares: holding.shares,
      currentPrice: holding.currentPrice,
      fallbackAmount: holding.amount,
    }),
  }
}
