import type { MarketCategoryScore } from '../../types/market'

type MainRiskDriversProps = {
  drivers: MarketCategoryScore[]
}

function MainRiskDrivers({ drivers }: MainRiskDriversProps) {
  return (
    <section className="rounded-lg border border-white/10 bg-white/[0.07] p-6 shadow-xl shadow-cyan-950/20 backdrop-blur-xl">
      <h2 className="text-2xl font-semibold text-white">
        主要風險來源｜Main Risk Drivers
      </h2>

      <div className="mt-5 grid gap-3">
        {drivers.map((driver, index) => (
          <article
            className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-slate-950/60 p-4"
            key={driver.key}
          >
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-cyan-200/20 bg-cyan-200/10 text-sm font-semibold text-cyan-100">
                {index + 1}
              </span>
              <div>
                <h3 className="font-semibold text-white">{driver.label}</h3>
                <p className="text-sm text-slate-400">{driver.description}</p>
              </div>
            </div>
            <p className="text-lg font-semibold text-cyan-100">
              {driver.score}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default MainRiskDrivers
