import type { HoldingType } from '../types/goal'

export interface HoldingAssumption {
  type: HoldingType
  expectedAnnualReturn: number
  exposureMultiplier: number
  reason: string
}

export function inferHoldingAssumption(input: string): HoldingAssumption {
  const normalizedInput = input.trim().toLowerCase()

  if (
    normalizedInput.includes('cash') ||
    normalizedInput.includes('現金') ||
    normalizedInput.includes('money market')
  ) {
    return {
      type: 'cash',
      expectedAnnualReturn: 0.01,
      exposureMultiplier: 0,
      reason: '判斷為現金或類現金部位，以低報酬、低波動假設估算。',
    }
  }

  if (
    normalizedInput.includes('bond') ||
    normalizedInput.includes('債') ||
    normalizedInput.includes('00835b') ||
    normalizedInput === 'b'
  ) {
    return {
      type: 'bond',
      expectedAnnualReturn: 0.03,
      exposureMultiplier: 0,
      reason: '判斷為債券或債券 ETF，以債券型資產的長期報酬假設估算。',
    }
  }

  if (
    normalizedInput.includes('槓桿') ||
    normalizedInput.includes('leveraged') ||
    normalizedInput.includes('leverage') ||
    normalizedInput.includes('2x') ||
    normalizedInput.includes('3x') ||
    normalizedInput.includes('00631l') ||
    normalizedInput.endsWith('l')
  ) {
    return {
      type: 'leveraged_stock',
      expectedAnnualReturn: 0.08,
      exposureMultiplier: 2,
      reason:
        '判斷為槓桿股票型資產。Polaris 以較高波動與 2 倍曝險做簡化估算。',
    }
  }

  if (
    normalizedInput.includes('stock') ||
    normalizedInput.includes('equity') ||
    normalizedInput.includes('etf') ||
    normalizedInput.includes('股票') ||
    normalizedInput.includes('00662') ||
    normalizedInput.includes('0050') ||
    normalizedInput.includes('006208') ||
    normalizedInput.includes('voo') ||
    normalizedInput.includes('vti') ||
    normalizedInput.includes('qqq') ||
    normalizedInput.includes('spy')
  ) {
    return {
      type: 'stock',
      expectedAnnualReturn: 0.06,
      exposureMultiplier: 1,
      reason: '判斷為股票或股票型 ETF，以股票型資產的長期報酬假設估算。',
    }
  }

  return {
    type: 'other',
    expectedAnnualReturn: 0.04,
    exposureMultiplier: 0.5,
    reason: 'Polaris 無法明確判斷此標的，先以其他資產的中性假設估算。建議你手動確認。',
  }
}
