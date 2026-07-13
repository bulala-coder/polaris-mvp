import type { HistoricalPricePoint } from './historicalReturnCalculations'
import { normalizeMarketSymbol } from './marketDataSymbols'

export async function fetchYahooChart(
  symbol: string,
): Promise<HistoricalPricePoint[]> {
  const normalizedSymbol = normalizeMarketSymbol(symbol)

  if (normalizedSymbol === '') {
    throw new Error('請先輸入標的代號。')
  }

  const response = await fetch(
    `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(
      normalizedSymbol,
    )}?range=10y&interval=1mo`,
  )

  if (!response.ok) {
    throw new Error('Yahoo Finance chart request failed.')
  }

  const data = await response.json()
  const result = data?.chart?.result?.[0]
  const timestamps: number[] | undefined = result?.timestamp
  const closes: Array<number | null> | undefined =
    result?.indicators?.quote?.[0]?.close

  if (!Array.isArray(timestamps) || !Array.isArray(closes)) {
    throw new Error('Yahoo Finance chart response is missing price data.')
  }

  const prices = timestamps
    .map((timestamp, index) => ({
      date: new Date(timestamp * 1000).toISOString(),
      close: closes[index],
    }))
    .filter(
      (price): price is HistoricalPricePoint =>
        typeof price.close === 'number' &&
        Number.isFinite(price.close) &&
        price.close > 0,
    )

  if (prices.length === 0) {
    throw new Error('Yahoo Finance chart response has no valid close prices.')
  }

  return prices
}
