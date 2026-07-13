import type { PortfolioHolding } from '../types/goal'

function toPositiveNumber(value: number) {
  if (!Number.isFinite(value) || Number.isNaN(value)) {
    return 0
  }

  return Math.max(value, 0)
}

export function getHoldingsTotalValue(holdings: PortfolioHolding[]): number {
  return holdings.reduce(
    (totalValue, holding) => totalValue + toPositiveNumber(holding.amount),
    0,
  )
}

export function calculateHoldingsExpectedReturn(
  holdings: PortfolioHolding[],
) {
  const totalValue = getHoldingsTotalValue(holdings)

  if (totalValue <= 0) {
    return {
      totalValue: 0,
      expectedAnnualReturn: 0,
      expectedAnnualReturnPercent: 0,
      weightedHoldings: [],
      helperText:
        '這是依你輸入的投資標的金額與各標的長期報酬率假設加權計算而來。它不是市場預測，也不是保證報酬；如果市場會乖乖照 Excel 表演出，世界上就不需要風險管理了。',
    }
  }

  const weightedHoldings = holdings
    .filter((holding) => toPositiveNumber(holding.amount) > 0)
    .map((holding) => {
      const amount = toPositiveNumber(holding.amount)
      const expectedAnnualReturn = toPositiveNumber(
        holding.expectedAnnualReturn,
      )
      const weight = amount / totalValue

      return {
        id: holding.id,
        name: holding.name,
        weight,
        expectedAnnualReturn,
        contributionToReturn: weight * expectedAnnualReturn,
      }
    })
  const expectedAnnualReturn = weightedHoldings.reduce(
    (totalReturn, holding) => totalReturn + holding.contributionToReturn,
    0,
  )

  return {
    totalValue,
    expectedAnnualReturn,
    expectedAnnualReturnPercent: expectedAnnualReturn * 100,
    weightedHoldings,
    helperText:
      '這是依你輸入的投資標的金額與各標的長期報酬率假設加權計算而來。它不是市場預測，也不是保證報酬；如果市場會乖乖照 Excel 表演出，世界上就不需要風險管理了。',
  }
}

export function calculateHoldingsExposure(holdings: PortfolioHolding[]) {
  const totalValue = getHoldingsTotalValue(holdings)

  if (totalValue <= 0) {
    return {
      totalValue: 0,
      currentExposure: 0,
      currentExposurePercent: 0,
      helperText:
        '目前曝險率根據各標的金額與曝險倍數估算。這是簡化模型，不是完整風險模型。',
    }
  }

  const currentExposure = holdings.reduce((totalExposure, holding) => {
    const amount = toPositiveNumber(holding.amount)
    const exposureMultiplier = toPositiveNumber(holding.exposureMultiplier)

    return totalExposure + (amount / totalValue) * exposureMultiplier
  }, 0)

  return {
    totalValue,
    currentExposure,
    currentExposurePercent: currentExposure * 100,
    helperText:
      '目前曝險率根據各標的金額與曝險倍數估算。這是簡化模型，不是完整風險模型。',
  }
}
