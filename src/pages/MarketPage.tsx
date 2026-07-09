import AppShell from '../components/layout/AppShell'
import PageContainer from '../components/layout/PageContainer'
import CategoryScoreList from '../components/market/CategoryScoreList'
import MainRiskDrivers from '../components/market/MainRiskDrivers'
import MarketRiskSummaryCard from '../components/market/MarketRiskSummaryCard'
import { mockMarketScore } from '../data/mockData'

function MarketPage() {
  return (
    <AppShell>
      <PageContainer>
        <div className="mb-8 max-w-3xl">
          <p className="mb-4 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-100">
            Market
          </p>
          <h1 className="text-4xl font-semibold tracking-normal text-white sm:text-5xl">
            Market
          </h1>
          <p className="mt-5 text-xl leading-relaxed text-slate-300">
            理解目前市場環境對長期策略的壓力
          </p>
        </div>

        <div className="grid gap-5">
          <MarketRiskSummaryCard marketScore={mockMarketScore} />

          <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="grid gap-5">
              <MainRiskDrivers drivers={mockMarketScore.mainRiskDrivers} />
              <section className="rounded-lg border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-black/20 backdrop-blur">
                <p className="text-sm font-medium text-slate-400">
                  Data Confidence
                </p>
                <p className="mt-3 text-2xl font-semibold text-white">
                  Medium
                </p>
              </section>
            </div>

            <CategoryScoreList
              categoryScores={mockMarketScore.categoryScores}
            />
          </div>
        </div>
      </PageContainer>
    </AppShell>
  )
}

export default MarketPage
