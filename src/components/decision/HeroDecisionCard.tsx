import type { ReactNode } from 'react'
import type { DailyDecision } from '../../types/decision'
import RiskLevelBadge from './RiskLevelBadge'

type HeroDecisionCardProps = {
  decision: DailyDecision
}

type DecisionItem = {
  label: string
  value: ReactNode
}

function HeroDecisionCard({ decision }: HeroDecisionCardProps) {
  const decisionItems: DecisionItem[] = [
    { label: '今日結論', value: decision.decisionLabel },
    { label: '市場風險', value: <RiskLevelBadge decision={decision} /> },
    { label: '投資組合狀態', value: decision.portfolioStatus },
    { label: '建議行動', value: decision.recommendedAction },
    { label: '不建議', value: decision.notRecommendedAction },
  ]

  return (
    <section className="rounded-lg border border-white/10 bg-white/[0.07] p-6 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl sm:p-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-cyan-200/80">
            Today
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            今日決策卡
          </h2>
        </div>
        <div className="h-12 w-12 rounded-full border border-cyan-200/30 bg-cyan-200/10 shadow-[0_0_36px_rgba(125,211,252,0.22)]" />
      </div>

      <p className="mb-2 text-lg font-medium text-cyan-100">
        {decision.decisionSummary}
      </p>

      <dl className="divide-y divide-white/10">
        {decisionItems.map(({ label, value }) => (
          <div
            className="grid gap-2 py-4 sm:grid-cols-[9rem_1fr] sm:items-start"
            key={label}
          >
            <dt className="text-sm font-medium text-slate-400">{label}</dt>
            <dd className="text-base font-medium leading-relaxed text-slate-50 sm:text-lg">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

export default HeroDecisionCard
