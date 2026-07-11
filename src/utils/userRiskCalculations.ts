import type {
  UserPosition,
  UserRiskCapacity,
  UserRiskCapacityLevel,
} from '../types/userPosition'

function clampScore(score: number) {
  return Math.min(100, Math.max(0, score))
}

function getRiskCapacityLevel(score: number): UserRiskCapacityLevel {
  if (score <= 39) {
    return 'low'
  }

  if (score <= 69) {
    return 'medium'
  }

  return 'high'
}

export function calculateUserRiskCapacity(
  userPosition: UserPosition,
): UserRiskCapacity {
  let score = 50
  const reasons: string[] = []

  if (userPosition.investmentHorizonYears >= 15) {
    score += 15
    reasons.push('投資期限較長，能支撐較高的風險承受能力。')
  } else if (userPosition.investmentHorizonYears >= 7) {
    score += 5
    reasons.push('投資期限中等，提供中等風險承受條件。')
  } else {
    score -= 10
    reasons.push('投資期限較短，會限制風險承受能力。')
  }

  if (userPosition.cashReserveMonths >= 12) {
    score += 10
    reasons.push('現金安全水位充足，有助於承受市場波動。')
  } else if (userPosition.cashReserveMonths >= 6) {
    score += 5
    reasons.push('現金安全水位接近基本門檻。')
  } else {
    score -= 15
    reasons.push('現金安全水位低於安全門檻。')
  }

  if (userPosition.maxAcceptableDrawdown >= 35) {
    score += 10
    reasons.push('可接受回撤較高，有助於承受投資波動。')
  } else if (userPosition.maxAcceptableDrawdown < 20) {
    score -= 15
    reasons.push('可接受回撤較低，會限制風險承受能力。')
  }

  if (userPosition.usesLeverage) {
    score -= 10
    reasons.push('使用槓桿會降低整體風險承受能力。')
  }

  if (userPosition.age >= 55) {
    score -= 10
    reasons.push('較接近資金使用階段，風險承受能力需要更保守評估。')
  } else if (userPosition.age < 35) {
    score += 5
    reasons.push('較早期的人生階段通常能支撐較長期的投資計畫。')
  }

  const clampedScore = clampScore(score)

  return {
    score: clampedScore,
    level: getRiskCapacityLevel(clampedScore),
    reasons: reasons.slice(0, 4),
  }
}
