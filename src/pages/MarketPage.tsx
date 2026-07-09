import AppShell from '../components/layout/AppShell'
import PageContainer from '../components/layout/PageContainer'
import CategoryScoreList from '../components/market/CategoryScoreList'
import MainRiskDrivers from '../components/market/MainRiskDrivers'
import MarketInsightCard from '../components/market/MarketInsightCard'
import MarketNoteBox from '../components/market/MarketNoteBox'
import MarketRiskSummaryCard from '../components/market/MarketRiskSummaryCard'
import { mockMarketScore } from '../data/mockData'

const insightItems = [
  {
    label: 'Market Risk',
    value: 'Level 3｜中性偏高',
    helperText: '目前風險背景偏高，適合提高檢查頻率。',
  },
  {
    label: 'Data Confidence',
    value: 'Medium',
    helperText: '此版本以 mock data 呈現產品判讀方式。',
  },
  {
    label: 'Top Driver',
    value: '市場情緒偏熱',
    helperText: '情緒分數是目前 mock 資料中最高的風險來源。',
  },
]

const interpretationItems = [
  '目前市場風險處於中性偏高，代表需要提高紀律，但不代表必須立即退出市場。',
  '情緒與估值分數偏高時，應避免因樂觀氣氛而過度加碼。',
  '波動與利率風險仍需觀察，應和投資組合曝險一起判斷。',
]

const usageLimitItems = [
  'Market 分數不是市場預測。',
  'Market 分數不應單獨決定買賣。',
  '任何調整都應同時考慮投資期限、現金安全水位與原本配置計畫。',
]

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
          <p className="mt-4 text-base leading-relaxed text-slate-400">
            Market
            用來觀察市場環境的風險背景，不是預測漲跌，也不是短線買賣訊號。
          </p>
        </div>

        <div className="grid gap-5">
          <MarketRiskSummaryCard marketScore={mockMarketScore} />

          <section className="grid gap-4 md:grid-cols-3">
            {insightItems.map((item) => (
              <MarketInsightCard
                helperText={item.helperText}
                key={item.label}
                label={item.label}
                value={item.value}
              />
            ))}
          </section>

          <div className="grid gap-5 lg:grid-cols-2">
            <MarketNoteBox title="市場判讀" items={interpretationItems} />
            <MarketNoteBox title="使用限制" items={usageLimitItems} />
          </div>

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
