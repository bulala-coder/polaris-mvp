import { useEffect, useMemo, useRef, useState } from 'react'
import AppShell from '../components/layout/AppShell'
import PageContainer from '../components/layout/PageContainer'
import CategoryScoreList from '../components/market/CategoryScoreList'
import MarketEditor from '../components/market/MarketEditor'
import MainRiskDrivers from '../components/market/MainRiskDrivers'
import MarketInsightCard from '../components/market/MarketInsightCard'
import MarketNoteBox from '../components/market/MarketNoteBox'
import MarketRiskSummaryCard from '../components/market/MarketRiskSummaryCard'
import { mockMarketInput } from '../data/mockData'
import { buildMarketScore } from '../utils/marketCalculations'
import {
  readFromStorage,
  removeFromStorage,
  storageKeys,
  writeToStorage,
} from '../utils/storage'

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

function formatConfidenceLevel(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

function MarketPage() {
  const skipNextStorageWrite = useRef(false)
  const [marketInput, setMarketInput] = useState(() =>
    readFromStorage(storageKeys.marketInput, { ...mockMarketInput }),
  )
  const marketScore = useMemo(
    () => buildMarketScore(marketInput),
    [marketInput],
  )

  useEffect(() => {
    if (skipNextStorageWrite.current) {
      skipNextStorageWrite.current = false
      return
    }

    writeToStorage(storageKeys.marketInput, marketInput)
  }, [marketInput])

  const topDriver = marketScore.mainRiskDrivers[0]

  const insightItems = [
    {
      label: '市場風險｜Market Risk',
      value: `Level ${marketScore.marketRiskLevel}｜${marketScore.marketRiskLabel}`,
      helperText: '目前風險背景偏高，適合提高檢查頻率。',
    },
    {
      label: '資料信心度｜Data Confidence',
      value: formatConfidenceLevel(marketScore.dataConfidenceLevel),
      helperText: '此版本以 mock data 呈現產品判讀方式。',
    },
    {
      label: '主要風險來源｜Top Driver',
      value: topDriver
        ? `${topDriver.description}偏熱`
        : '尚未設定主要來源',
      helperText: topDriver
        ? `${topDriver.label} 是目前分數最高的風險來源。`
        : '請先設定市場分數。',
    },
  ]

  return (
    <AppShell>
      <PageContainer>
        <div className="mb-8 max-w-3xl">
          <p className="mb-4 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-100">
            市場風險｜Market
          </p>
          <h1 className="text-4xl font-semibold tracking-normal text-white sm:text-5xl">
            市場風險｜Market
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
          <MarketRiskSummaryCard marketScore={marketScore} />

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

          <div className="grid gap-4">
            <MarketEditor
              marketInput={marketInput}
              onMarketInputChange={setMarketInput}
            />
            <button
              className="justify-self-start rounded-lg border border-cyan-200/30 bg-cyan-200/10 px-5 py-3 text-base font-semibold text-cyan-50 shadow-[0_0_32px_rgba(34,211,238,0.12)] transition hover:border-cyan-100/60 hover:bg-cyan-200/15 focus:outline-none focus:ring-2 focus:ring-cyan-200/70"
              onClick={() => {
                removeFromStorage(storageKeys.marketInput)
                skipNextStorageWrite.current = true
                setMarketInput({ ...mockMarketInput })
              }}
              type="button"
            >
              重設示範市場資料
            </button>
          </div>

          <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="grid gap-5">
              <MainRiskDrivers drivers={marketScore.mainRiskDrivers} />
              <section className="rounded-lg border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-black/20 backdrop-blur">
                <p className="text-sm font-medium text-slate-400">
                  資料信心度｜Data Confidence
                </p>
                <p className="mt-3 text-2xl font-semibold text-white">
                  {formatConfidenceLevel(marketScore.dataConfidenceLevel)}
                </p>
              </section>
            </div>

            <CategoryScoreList
              categoryScores={marketScore.categoryScores}
            />
          </div>
        </div>
      </PageContainer>
    </AppShell>
  )
}

export default MarketPage
