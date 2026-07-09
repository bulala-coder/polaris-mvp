type SettingsStatusItem = {
  label: string
  value: string
  helperText?: string
}

type SettingsStatusGridProps = {
  items: SettingsStatusItem[]
}

function SettingsStatusGrid({ items }: SettingsStatusGridProps) {
  return (
    <section className="rounded-lg border border-white/10 bg-white/[0.07] p-6 shadow-xl shadow-cyan-950/20 backdrop-blur-xl sm:p-7">
      <h2 className="text-2xl font-semibold text-white">目前資料狀態</h2>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <article
            className="rounded-lg border border-white/10 bg-slate-950/60 p-4"
            key={item.label}
          >
            <p className="text-sm font-medium text-slate-400">{item.label}</p>
            <p className="mt-2 text-lg font-semibold text-cyan-100">
              {item.value}
            </p>
            {item.helperText ? (
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                {item.helperText}
              </p>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  )
}

export default SettingsStatusGrid
