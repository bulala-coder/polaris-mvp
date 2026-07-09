type SettingsInfoItem =
  | string
  | {
      label: string
      value: string
    }

type SettingsInfoCardProps = {
  title: string
  description: string
  items: SettingsInfoItem[]
}

function SettingsInfoCard({
  title,
  description,
  items,
}: SettingsInfoCardProps) {
  return (
    <section className="rounded-lg border border-white/10 bg-white/[0.07] p-6 shadow-xl shadow-cyan-950/20 backdrop-blur-xl sm:p-7">
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
      <p className="mt-3 text-base leading-relaxed text-slate-400">
        {description}
      </p>

      <div className="mt-6 grid gap-3">
        {items.map((item) => {
          if (typeof item === 'string') {
            return (
              <div
                className="rounded-lg border border-white/10 bg-slate-950/60 p-4 text-base font-medium text-slate-100"
                key={item}
              >
                {item}
              </div>
            )
          }

          return (
            <div
              className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-white/10 bg-slate-950/60 p-4"
              key={item.label}
            >
              <span className="text-sm font-medium text-slate-400">
                {item.label}
              </span>
              <span className="text-base font-semibold text-cyan-100">
                {item.value}
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default SettingsInfoCard
