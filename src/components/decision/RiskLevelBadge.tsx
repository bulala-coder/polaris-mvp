import type { DailyDecision } from '../../types/decision'
import { formatRiskLevelLabel } from '../../utils/labels'

type RiskLevelBadgeProps = {
  decision: DailyDecision
}

function RiskLevelBadge({ decision }: RiskLevelBadgeProps) {
  return (
    <span className="inline-flex rounded-full border border-cyan-200/20 bg-cyan-200/10 px-3 py-1 text-sm font-semibold text-cyan-100">
      {formatRiskLevelLabel(decision)}
    </span>
  )
}

export default RiskLevelBadge
