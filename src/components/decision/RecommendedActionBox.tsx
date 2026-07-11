type RecommendedActionBoxProps = {
  items: string[]
}

function RecommendedActionBox({ items }: RecommendedActionBoxProps) {
  return (
    <section className="rounded-lg border border-cyan-200/15 bg-cyan-200/[0.06] p-6 shadow-xl shadow-cyan-950/20 backdrop-blur-xl">
      <h2 className="text-2xl font-semibold text-white">
        建議行動｜Recommended Actions
      </h2>

      <ul className="mt-5 grid gap-3">
        {items.map((item) => (
          <li
            className="rounded-lg border border-white/10 bg-slate-950/60 p-4 text-base leading-relaxed text-slate-200"
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default RecommendedActionBox
