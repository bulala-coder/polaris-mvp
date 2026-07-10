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
    reasons.push('Long investment horizon supports higher risk capacity.')
  } else if (userPosition.investmentHorizonYears >= 7) {
    score += 5
    reasons.push('Medium investment horizon provides moderate risk capacity.')
  } else {
    score -= 10
    reasons.push('Short investment horizon limits risk capacity.')
  }

  if (userPosition.cashReserveMonths >= 12) {
    score += 10
    reasons.push('Cash reserve supports risk capacity.')
  } else if (userPosition.cashReserveMonths >= 6) {
    score += 5
    reasons.push('Cash reserve is near the safety threshold.')
  } else {
    score -= 15
    reasons.push('Cash reserve is below safety threshold.')
  }

  if (userPosition.maxAcceptableDrawdown >= 35) {
    score += 10
    reasons.push('Higher drawdown tolerance supports risk capacity.')
  } else if (userPosition.maxAcceptableDrawdown < 20) {
    score -= 15
    reasons.push('Lower drawdown tolerance limits risk capacity.')
  }

  if (userPosition.usesLeverage) {
    score -= 10
    reasons.push('Leverage reduces risk capacity.')
  }

  if (userPosition.age >= 55) {
    score -= 10
    reasons.push('Later life stage reduces risk capacity.')
  } else if (userPosition.age < 35) {
    score += 5
    reasons.push('Earlier life stage can support higher risk capacity.')
  }

  const clampedScore = clampScore(score)

  return {
    score: clampedScore,
    level: getRiskCapacityLevel(clampedScore),
    reasons: reasons.slice(0, 4),
  }
}
