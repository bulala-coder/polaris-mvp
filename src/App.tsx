import './App.css'

const decisionItems = [
  ['今日結論', '維持策略'],
  ['市場風險', 'Level 3｜中性偏高'],
  ['投資組合狀態', '配置輕微偏離'],
  ['建議行動', '維持原定長期策略，用新資金微調配置'],
  ['不建議', '不要因短期新聞或單日波動大幅改變策略'],
]

const pillars = [
  {
    title: 'Position',
    description: '人生先於市場',
  },
  {
    title: 'Context',
    description: '理解市場環境',
  },
  {
    title: 'Decision',
    description: '做出冷靜行動',
  },
]

function App() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#060817] text-slate-100">
      <div className="space-background absolute inset-0" aria-hidden="true" />
      <section className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-6 py-12 sm:px-8 lg:px-10">
        <div className="mb-10 max-w-3xl">
          <p className="mb-4 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-100 shadow-[0_0_32px_rgba(34,211,238,0.12)]">
            Polaris v0.1
          </p>
          <h1 className="text-5xl font-semibold tracking-normal text-white sm:text-6xl lg:text-7xl">
            Polaris 北極星
          </h1>
          <p className="mt-5 text-xl text-slate-300 sm:text-2xl">
            長期投資者的決策羅盤
          </p>
          <p className="mt-8 max-w-2xl text-2xl font-medium leading-snug text-cyan-100 sm:text-3xl">
            今天，我需要改變我的投資策略嗎？
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.35fr_1fr] lg:items-stretch">
          <section className="rounded-lg border border-white/10 bg-white/[0.07] p-6 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl sm:p-8">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.28em] text-cyan-200/80">
                  Today
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white">
                  今日決策卡
                </h2>
              </div>
              <div className="h-12 w-12 rounded-full border border-cyan-200/30 bg-cyan-200/10 shadow-[0_0_36px_rgba(125,211,252,0.22)]" />
            </div>

            <dl className="divide-y divide-white/10">
              {decisionItems.map(([label, value]) => (
                <div
                  className="grid gap-2 py-4 sm:grid-cols-[9rem_1fr] sm:items-start"
                  key={label}
                >
                  <dt className="text-sm font-medium text-slate-400">
                    {label}
                  </dt>
                  <dd className="text-base font-medium leading-relaxed text-slate-50 sm:text-lg">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="grid gap-4">
            {pillars.map((pillar) => (
              <article
                className="rounded-lg border border-white/10 bg-slate-950/60 p-5 shadow-xl shadow-black/20 backdrop-blur"
                key={pillar.title}
              >
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">
                  {pillar.title}
                </p>
                <h3 className="mt-3 text-xl font-semibold text-white">
                  {pillar.description}
                </h3>
              </article>
            ))}
          </section>
        </div>
      </section>
    </main>
  )
}

export default App
