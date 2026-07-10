import { useMemo } from 'react'
import HeroDecisionCard from '../components/decision/HeroDecisionCard'
import NotRecommendedBox from '../components/decision/NotRecommendedBox'
import ReasonList from '../components/decision/ReasonList'
import RecommendedActionBox from '../components/decision/RecommendedActionBox'
import SnapshotCard from '../components/decision/SnapshotCard'
import AppShell from '../components/layout/AppShell'
import PageContainer from '../components/layout/PageContainer'
import { defaultUserPosition } from '../data/defaultUserPosition'
import {
  mockDailyDecision,
  mockMarketInput,
  mockPortfolio,
} from '../data/mockData'
import type { DecisionRiskLevel } from '../types/decisionOutput'
import { buildMarketScore } from '../utils/marketCalculations'
import { calculatePortfolioMetrics } from '../utils/portfolioCalculations'
import { generateTodayDecision } from '../utils/decisionEngine'
import {
  readFromStorage,
  storageKeys,
} from '../utils/storage'
import { calculateUserRiskCapacity } from '../utils/userRiskCalculations'

const riskLevelLabels: Record<DecisionRiskLevel, string> = {
  1: '低風險',
  2: '中性偏低',
  3: '中性偏高',
  4: '高風險',
  5: '極高風險',
}

function TodayPage() {
  const portfolioAssets = useMemo(
    () => readFromStorage(storageKeys.portfolioAssets, mockPortfolio.assets),
    [],
  )
  const marketInput = useMemo(
    () => readFromStorage(storageKeys.marketInput, mockMarketInput),
    [],
  )
  const userPosition = useMemo(
    () => readFromStorage(storageKeys.userPosition, defaultUserPosition),
    [],
  )

  const portfolio = useMemo(
    () => calculatePortfolioMetrics(portfolioAssets),
    [portfolioAssets],
  )
  const marketScore = useMemo(() => buildMarketScore(marketInput), [marketInput])
  const userRiskCapacity = useMemo(
    () => calculateUserRiskCapacity(userPosition),
    [userPosition],
  )
  const decisionOutput = useMemo(
    () =>
      generateTodayDecision({
        portfolio,
        marketScore,
        userPosition,
        userRiskCapacity,
      }),
    [marketScore, portfolio, userPosition, userRiskCapacity],
  )

  const snapshotItems = [
    {
      label: 'Market Risk',
      value: `Level ${marketScore.marketRiskLevel}｜${marketScore.marketRiskLabel}`,
      helperText: '市場壓力會用於判斷今天是否需要更謹慎。',
    },
    {
      label: 'Portfolio Drift',
      value: `${(portfolio.totalDrift * 100).toFixed(1)}%`,
      helperText: '配置偏離會用於判斷是否需要回到原本計畫。',
    },
    {
      label: 'Effective Exposure',
      value: `${Math.round(portfolio.effectiveExposure * 100)}%`,
      helperText: '反映槓桿與低曝險資產後的整體曝險。',
    },
  ]

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

        <HeroDecisionCard
          decision={mockDailyDecision}
          decisionLabel={decisionOutput.decisionLabel}
          notRecommendedAction={decisionOutput.notRecommendedActions[0]}
          portfolioStatus={`配置偏離 ${(portfolio.totalDrift * 100).toFixed(1)}%`}
          recommendedAction={decisionOutput.recommendedActions[0]}
          riskLabel={riskLevelLabels[decisionOutput.riskLevel]}
          riskLevel={decisionOutput.riskLevel}
          summary={decisionOutput.summary}
        />

        <section className="mt-5">
          <h2 className="text-2xl font-semibold text-white">Snapshot</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {snapshotItems.map((item) => (
              <SnapshotCard
                helperText={item.helperText}
                key={item.label}
                label={item.label}
                value={item.value}
              />
            ))}
          </div>
        </section>

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <ReasonList reasons={decisionOutput.reasons} />
          <RecommendedActionBox items={decisionOutput.recommendedActions} />
          <NotRecommendedBox items={decisionOutput.notRecommendedActions} />
        </div>

        <section className="mt-5 rounded-lg border border-white/10 bg-slate-950/60 p-5 text-sm leading-relaxed text-slate-400 shadow-xl shadow-black/20 backdrop-blur">
          <h2 className="text-base font-semibold text-slate-100">
            Trust Notice
          </h2>
          <p className="mt-3">{decisionOutput.trustNotice}</p>
        </section>
      </PageContainer>
    </AppShell>
  )
}

export default TodayPage
