import { Link } from 'react-router-dom'
import HeroDecisionCard from '../components/decision/HeroDecisionCard'
import AppShell from '../components/layout/AppShell'
import PageContainer from '../components/layout/PageContainer'
import { mockDailyDecision } from '../data/mockData'

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

function WelcomePage() {
  return (
    <AppShell showNavigation={false}>
      <PageContainer>
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
          <Link
            className="mt-8 inline-flex rounded-lg border border-cyan-200/30 bg-cyan-200/10 px-5 py-3 text-base font-semibold text-cyan-50 shadow-[0_0_32px_rgba(34,211,238,0.16)] transition hover:border-cyan-100/60 hover:bg-cyan-200/15 focus:outline-none focus:ring-2 focus:ring-cyan-200/70"
            to="/today"
          >
            查看今日決策
          </Link>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.35fr_1fr] lg:items-stretch">
          <HeroDecisionCard decision={mockDailyDecision} />

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
      </PageContainer>
    </AppShell>
  )
}

export default WelcomePage
