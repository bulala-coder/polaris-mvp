import HeroDecisionCard from '../components/decision/HeroDecisionCard'
import AppShell from '../components/layout/AppShell'
import PageContainer from '../components/layout/PageContainer'
import { mockDailyDecision } from '../data/mockData'

function TodayPage() {
  return (
    <AppShell>
      <PageContainer>
        <div className="mb-8 max-w-3xl">
          <p className="mb-4 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-100 shadow-[0_0_32px_rgba(34,211,238,0.12)]">
            Today
          </p>
          <h1 className="text-4xl font-semibold tracking-normal text-white sm:text-5xl">
            今日決策
          </h1>
          <p className="mt-5 text-xl leading-relaxed text-slate-300">
            以長期策略為核心，快速檢查今天是否需要調整行動。
          </p>
        </div>

        <HeroDecisionCard decision={mockDailyDecision} />
      </PageContainer>
    </AppShell>
  )
}

export default TodayPage
