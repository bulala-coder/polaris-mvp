type PortfolioNoteBoxProps = {
  title: string
  items: string[]
}

function PortfolioNoteBox({ title, items }: PortfolioNoteBoxProps) {
  return (
    <section className="rounded-lg border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-black/20 backdrop-blur">
      <h2 className="text-2xl font-semibold text-white">{title}</h2>

      <ul className="mt-5 grid gap-3">
        {items.map((item) => (
          <li
            className="rounded-lg border border-white/10 bg-white/[0.04] p-4 text-base leading-relaxed text-slate-200"
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default PortfolioNoteBox
