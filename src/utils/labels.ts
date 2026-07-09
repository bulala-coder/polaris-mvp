import type { DailyDecision } from '../types/decision'

export function formatRiskLevelLabel(decision: DailyDecision) {
  return `Level ${decision.marketRiskLevel}｜${decision.marketRiskLabel}`
}
