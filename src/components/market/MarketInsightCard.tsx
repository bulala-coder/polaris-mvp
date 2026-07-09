type MarketInsightCardProps = {
  label: string
  value: string
  helperText: string
}

function MarketInsightCard({
  label,
  value,
  helperText,
}: MarketInsightCardProps) {
  return (
    <article className="rounded-lg border border-white/10 bg-white/[0.07] p-5 shadow-xl shadow-cyan-950/20 backdrop-blur-xl">
      <p className="text-sm font-medium text-slate-400">{label}</p>
      <p className="mt-3 text-2xl font-semibold text-white">{value}</p>
      <p className="mt-3 text-sm leading-relaxed text-slate-400">
        {helperText}
      </p>
    </article>
  )
}

export default MarketInsightCard
