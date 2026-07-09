type ReasonListProps = {
  reasons: string[]
}

function ReasonList({ reasons }: ReasonListProps) {
  return (
    <section className="rounded-lg border border-white/10 bg-white/[0.07] p-6 shadow-xl shadow-cyan-950/20 backdrop-blur-xl">
      <h2 className="text-2xl font-semibold text-white">主要原因</h2>

      <div className="mt-5 grid gap-3">
        {reasons.map((reason, index) => (
          <div
            className="flex gap-3 rounded-lg border border-white/10 bg-slate-950/60 p-4"
            key={reason}
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-cyan-200/20 bg-cyan-200/10 text-sm font-semibold text-cyan-100">
              {index + 1}
            </span>
            <p className="text-base leading-relaxed text-slate-200">
              {reason}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ReasonList
