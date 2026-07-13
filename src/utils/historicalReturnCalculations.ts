export interface HistoricalPricePoint {
  date: string
  close: number
}

export interface HistoricalReturnResult {
  latestPrice: number
  firstPrice: number
  years: number
  annualizedReturn: number
  annualizedReturnPercent: number
  latestDate: string
  firstDate: string
  helperText: string
}

const historicalReturnHelperText =
  '這是依可取得歷史價格計算的年化報酬率，通常不含配息再投入。歷史報酬不是未來保證，市場如果會乖乖重播，風控就可以退休了。'

export function calculateAnnualizedReturnFromPrices(
  prices: HistoricalPricePoint[],
): HistoricalReturnResult | null {
  const sortedPrices = prices
    .filter((price) => Number.isFinite(price.close) && price.close > 0)
    .sort(
      (firstPrice, secondPrice) =>
        new Date(firstPrice.date).getTime() -
        new Date(secondPrice.date).getTime(),
    )

  const firstPricePoint = sortedPrices[0]
  const latestPricePoint = sortedPrices[sortedPrices.length - 1]

  if (!firstPricePoint || !latestPricePoint) {
    return null
  }

  const firstDateTime = new Date(firstPricePoint.date).getTime()
  const latestDateTime = new Date(latestPricePoint.date).getTime()
  const years = (latestDateTime - firstDateTime) / (365.25 * 24 * 60 * 60 * 1000)

  if (
    !Number.isFinite(years) ||
    years <= 0 ||
    !Number.isFinite(firstPricePoint.close) ||
    !Number.isFinite(latestPricePoint.close) ||
    firstPricePoint.close <= 0 ||
    latestPricePoint.close <= 0
  ) {
    return null
  }

  const annualizedReturn =
    Math.pow(latestPricePoint.close / firstPricePoint.close, 1 / years) - 1

  if (!Number.isFinite(annualizedReturn)) {
    return null
  }

  return {
    latestPrice: latestPricePoint.close,
    firstPrice: firstPricePoint.close,
    years,
    annualizedReturn,
    annualizedReturnPercent: annualizedReturn * 100,
    latestDate: latestPricePoint.date,
    firstDate: firstPricePoint.date,
    helperText: historicalReturnHelperText,
  }
}
