type SettingsSectionCardProps = {
  title: string
  items: string[]
}

function SettingsSectionCard({ title, items }: SettingsSectionCardProps) {
  return (
    <section className="rounded-lg border border-white/10 bg-white/[0.07] p-6 shadow-xl shadow-cyan-950/20 backdrop-blur-xl sm:p-7">
      <h2 className="text-2xl font-semibold text-white">{title}</h2>

      <ul className="mt-6 grid gap-3">
        {items.map((item) => (
          <li
            className="rounded-lg border border-white/10 bg-slate-950/60 p-4 text-base leading-relaxed text-slate-100"
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default SettingsSectionCard
