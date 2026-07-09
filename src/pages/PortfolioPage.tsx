import AppShell from '../components/layout/AppShell'
import PageContainer from '../components/layout/PageContainer'
import PortfolioAssetCard from '../components/portfolio/PortfolioAssetCard'
import PortfolioSummaryCard from '../components/portfolio/PortfolioSummaryCard'
import { mockPortfolio } from '../data/mockData'

function PortfolioPage() {
  return (
    <AppShell>
      <PageContainer>
        <div className="mb-8 max-w-3xl">
          <p className="mb-4 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-100">
            Portfolio
          </p>
          <h1 className="text-4xl font-semibold tracking-normal text-white sm:text-5xl">
            Portfolio
          </h1>
          <p className="mt-5 text-xl leading-relaxed text-slate-300">
            檢查你的配置是否仍貼近原本策略
          </p>
        </div>

        <div className="grid gap-5">
          <PortfolioSummaryCard portfolio={mockPortfolio} />

          <section className="grid gap-4">
            {mockPortfolio.assets.map((asset) => (
              <PortfolioAssetCard asset={asset} key={asset.ticker} />
            ))}
          </section>
        </div>
      </PageContainer>
    </AppShell>
  )
}

export default PortfolioPage
