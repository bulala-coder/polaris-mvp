import { useMemo, useState } from 'react'
import AppShell from '../components/layout/AppShell'
import PageContainer from '../components/layout/PageContainer'
import PortfolioAssetCard from '../components/portfolio/PortfolioAssetCard'
import PortfolioEditor from '../components/portfolio/PortfolioEditor'
import PortfolioInsightCard from '../components/portfolio/PortfolioInsightCard'
import PortfolioNoteBox from '../components/portfolio/PortfolioNoteBox'
import PortfolioSummaryCard from '../components/portfolio/PortfolioSummaryCard'
import { mockPortfolio } from '../data/mockData'
import { calculatePortfolioMetrics } from '../utils/portfolioCalculations'

const currencyFormatter = new Intl.NumberFormat('zh-TW', {
  style: 'currency',
  currency: 'TWD',
  maximumFractionDigits: 0,
})

const percentFormatter = new Intl.NumberFormat('zh-TW', {
  style: 'percent',
  maximumFractionDigits: 1,
})

const interpretationItems = [
  '目前投資組合接近目標配置。',
  '曝險高於 100%，代表波動時資產變化會被放大。',
  '若沒有明顯偏離，可優先用新資金微調，而不是頻繁賣出。',
]

const rebalanceReminderItems = [
  '再平衡不是預測市場，而是讓投資組合回到原本計畫。',
  '若單一資產偏離過大，應先檢查是否仍符合長期策略。',
  '若市場風險升高，應同時檢查現金安全水位與槓桿曝險。',
]

function cloneDemoAssets() {
  return mockPortfolio.assets.map((asset) => ({ ...asset }))
}

function PortfolioPage() {
  const [assets, setAssets] = useState(cloneDemoAssets)
  const portfolio = useMemo(() => calculatePortfolioMetrics(assets), [assets])

  const insightItems = [
    {
      label: 'Total Value',
      value: currencyFormatter.format(portfolio.totalValue),
      helperText: '目前 portfolio 的總資產規模。',
    },
    {
      label: 'Effective Exposure',
      value: `約 ${percentFormatter.format(portfolio.effectiveExposure)}`,
      helperText: '納入槓桿與低曝險資產後的整體曝險概念。',
    },
    {
      label: 'Total Drift',
      value:
        portfolio.totalDrift > 0.05
          ? percentFormatter.format(portfolio.totalDrift)
          : '輕微偏離',
      helperText: '用來觀察目前配置與目標配置的距離。',
    },
  ]

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
          <p className="mt-4 text-base leading-relaxed text-slate-400">
            Portfolio
            用來檢查目前配置、目標配置、偏離程度與有效曝險，幫助你判斷是否需要再平衡。
          </p>
        </div>

        <div className="grid gap-5">
          <PortfolioSummaryCard portfolio={portfolio} />

          <section className="grid gap-4 md:grid-cols-3">
            {insightItems.map((item) => (
              <PortfolioInsightCard
                helperText={item.helperText}
                key={item.label}
                label={item.label}
                value={item.value}
              />
            ))}
          </section>

          <div className="grid gap-5 lg:grid-cols-2">
            <PortfolioNoteBox title="配置判讀" items={interpretationItems} />
            <PortfolioNoteBox
              title="再平衡提醒"
              items={rebalanceReminderItems}
            />
          </div>

          <div className="grid gap-4">
            <PortfolioEditor assets={assets} onAssetsChange={setAssets} />
            <button
              className="justify-self-start rounded-lg border border-cyan-200/30 bg-cyan-200/10 px-5 py-3 text-base font-semibold text-cyan-50 shadow-[0_0_32px_rgba(34,211,238,0.12)] transition hover:border-cyan-100/60 hover:bg-cyan-200/15 focus:outline-none focus:ring-2 focus:ring-cyan-200/70"
              onClick={() => setAssets(cloneDemoAssets())}
              type="button"
            >
              Reset demo data
            </button>
          </div>

          <section className="grid gap-4">
            {portfolio.assets.map((asset) => (
              <PortfolioAssetCard asset={asset} key={asset.ticker} />
            ))}
          </section>
        </div>
      </PageContainer>
    </AppShell>
  )
}

export default PortfolioPage
