type NotRecommendedBoxProps = {
  items: string[]
}

function NotRecommendedBox({ items }: NotRecommendedBoxProps) {
  return (
    <section className="rounded-lg border border-amber-200/15 bg-amber-200/[0.06] p-6 shadow-xl shadow-black/20 backdrop-blur-xl">
      <h2 className="text-2xl font-semibold text-white">
        不建議事項｜Not Recommended
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

export default NotRecommendedBox
