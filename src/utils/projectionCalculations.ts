import type { TenYearProjectionResult } from '../types/projection'

type TenYearProjectionParams = {
  startingValue: number
  monthlyContribution: number
  expectedAnnualReturn: number
  years?: number
}

function toSafeNumber(value: number) {
  if (!Number.isFinite(value) || Number.isNaN(value)) {
    return 0
  }

  return Math.max(value, 0)
}

export function calculateTenYearProjection({
  startingValue,
  monthlyContribution,
  expectedAnnualReturn,
  years = 10,
}: TenYearProjectionParams): TenYearProjectionResult {
  const safeYears = toSafeNumber(years)
  const safeStartingValue = toSafeNumber(startingValue)
  const safeMonthlyContribution = toSafeNumber(monthlyContribution)
  const safeExpectedAnnualReturn = toSafeNumber(expectedAnnualReturn)
  const monthlyReturn =
    Math.pow(1 + safeExpectedAnnualReturn, 1 / 12) - 1
  const totalMonths = Math.round(safeYears * 12)
  let value = safeStartingValue

  for (let month = 0; month < totalMonths; month += 1) {
    value = value * (1 + monthlyReturn)
    value += safeMonthlyContribution
  }

  const projectedValue = Number.isFinite(value) ? value : safeStartingValue
  const totalContribution = safeMonthlyContribution * totalMonths
  const estimatedGain =
    projectedValue - safeStartingValue - totalContribution
  const totalReturnPercent =
    safeStartingValue > 0
      ? (projectedValue / safeStartingValue - 1) * 100
      : 0

  return {
    years: safeYears,
    startingValue: safeStartingValue,
    monthlyContribution: safeMonthlyContribution,
    expectedAnnualReturn: safeExpectedAnnualReturn,
    projectedValue,
    totalContribution,
    estimatedGain,
    totalReturnPercent,
    annualizedReturnPercent: safeExpectedAnnualReturn * 100,
    helperText:
      '這是用目前投資組合總資產、每月投入與整體預期年化報酬率估算的 10 年結果。它不是市場預測，也不是保證報酬。市場如果會乖乖照 Excel 表演出，風控就可以退休了。',
  }
}
