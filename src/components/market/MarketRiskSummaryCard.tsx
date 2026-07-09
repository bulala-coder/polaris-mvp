import type { MarketScore } from '../../types/market'

type MarketRiskSummaryCardProps = {
  marketScore: MarketScore
}

function MarketRiskSummaryCard({ marketScore }: MarketRiskSummaryCardProps) {
  return (
    <section className="rounded-lg border border-white/10 bg-white/[0.07] p-6 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <p className="text-sm font-medium text-slate-400">
            Market Risk Score
          </p>
          <p className="mt-3 text-4xl font-semibold text-white">
            {marketScore.marketRiskScore.toFixed(1)}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-slate-400">Risk Level</p>
          <p className="mt-3 text-2xl font-semibold text-cyan-100">
            Level {marketScore.marketRiskLevel}｜{marketScore.marketRiskLabel}
          </p>
        </div>
      </div>

      <p className="mt-6 border-t border-white/10 pt-5 text-base leading-relaxed text-slate-300">
        分數越高代表市場風險越高，不代表市場一定會下跌
      </p>
    </section>
  )
}

export default MarketRiskSummaryCard
