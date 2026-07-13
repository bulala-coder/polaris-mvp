import AppShell from '../components/layout/AppShell'
import PageContainer from '../components/layout/PageContainer'
import { mockMarketInput } from '../data/mockData'
import { calculateExposureSummary } from '../utils/exposureCalculations'
import {
  calculateGoalProgress,
  estimateTimeToGoal,
} from '../utils/goalCalculations'
import { readGoalSettings } from '../utils/goalStorage'
import {
  calculateHoldingsExpectedReturn,
  calculateHoldingsExposure,
} from '../utils/holdingCalculations'
import { calculateHoldingMarketValue } from '../utils/holdingValueCalculations'
import {
  buildMarketScore,
  getSimpleMarketRisk,
} from '../utils/marketCalculations'
import { calculatePortfolioExpectedReturn } from '../utils/portfolioReturnCalculations'
import { readFromStorage, storageKeys } from '../utils/storage'

function formatCurrency(value: number) {
  return new Intl.NumberFormat('zh-TW', {
    style: 'currency',
    currency: 'TWD',
    maximumFractionDigits: 0,
  }).format(value)
}

function WelcomePage() {
  const marketInput = readFromStorage(storageKeys.marketInput, mockMarketInput)
  const marketScore = buildMarketScore(marketInput)
  const simpleMarketRisk = getSimpleMarketRisk(marketScore.marketRiskLevel)
  const goalSettings = readGoalSettings()
  const holdingsExpectedReturn = calculateHoldingsExpectedReturn(
    goalSettings.holdings,
  )
  const holdingsExposure = calculateHoldingsExposure(goalSettings.holdings)
  const usesHoldings = holdingsExpectedReturn.totalValue > 0
  const allocationExpectedReturn = calculatePortfolioExpectedReturn(goalSettings)
  const portfolioExpectedReturn = usesHoldings
    ? holdingsExpectedReturn
    : allocationExpectedReturn
  const currentNetWorth = usesHoldings
    ? holdingsExpectedReturn.totalValue
    : goalSettings.currentNetWorth
  const goalForCalculations = {
    ...goalSettings,
    currentNetWorth,
  }
  const goalProgress = calculateGoalProgress(goalForCalculations)
  const goalEta = estimateTimeToGoal(
    goalForCalculations,
    portfolioExpectedReturn.expectedAnnualReturn,
  )
  const exposureSummary = calculateExposureSummary({
    goal: goalSettings,
    marketRiskLevel: marketScore.marketRiskLevel,
    currentExposureOverride: usesHoldings
      ? holdingsExposure.currentExposure
      : undefined,
  })
  const exposureGapMessage =
    exposureSummary.currentExposure > exposureSummary.suggestedExposure
      ? '你的曝險比北極星建議高。這不代表你錯了，但代表你最好知道自己為什麼這麼做。投資裡最危險的事之一，是把運氣誤認為能力。'
      : '目前曝險還在可控範圍內。這通常不是最刺激的狀態，但長期投資本來就不是遊樂園雲霄飛車。'
  const dailyReminderByTone = {
    low: '今天不用猜市場。把簡單的事穩定做好，通常已經贏過很多聰明但手很癢的人。',
    medium: '今天適合保持理性。市場吵，不代表你也要跟著吵；價格熱，不代表你的腦袋也要發熱。',
    high: '今天先保護本金與紀律。投資不是比誰衝得快，而是比誰能少犯幾個會留下疤的錯。',
  }

  return (
    <AppShell>
      <PageContainer>
        <div className="mb-8 max-w-3xl">
          <p className="mb-4 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-100 shadow-[0_0_32px_rgba(34,211,238,0.12)]">
            首頁｜Home
          </p>
          <h1 className="text-5xl font-semibold tracking-normal text-white sm:text-6xl">
            Polaris 北極星
          </h1>
          <p className="mt-5 text-xl leading-relaxed text-slate-300 sm:text-2xl">
            一眼看懂市場風險與資產目標距離。
          </p>
        </div>

        <div className="grid gap-5">
          <section className="rounded-lg border border-white/10 bg-white/[0.07] p-6 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl sm:p-8">
            <p className="text-sm font-medium text-slate-400">
              市場風險
            </p>
            <p className="mt-4 text-5xl font-semibold text-cyan-100 sm:text-6xl">
              {simpleMarketRisk.label}
            </p>
            <p className="mt-5 border-t border-white/10 pt-5 text-base leading-relaxed text-slate-300">
              {simpleMarketRisk.description}
            </p>
          </section>

          <section className="rounded-lg border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-black/20 backdrop-blur sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">
                  資產目標進度
                </p>
                <p className="mt-3 text-4xl font-semibold text-white">
                  {goalProgress.progressPercent.toFixed(0)}%
                </p>
              </div>
              <div className="grid gap-2 text-sm text-slate-300 sm:text-right">
                <p>目前資產：{formatCurrency(goalSettings.currentNetWorth)}</p>
                {usesHoldings ? (
                  <p>標的合計：{formatCurrency(currentNetWorth)}</p>
                ) : null}
                <p>目標資產：{formatCurrency(goalSettings.targetNetWorth)}</p>
                <p>
                  距離目標還差：{formatCurrency(goalProgress.remainingAmount)}
                </p>
              </div>
            </div>

            <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-cyan-300"
                style={{ width: `${goalProgress.progressPercent}%` }}
              />
            </div>

            <p className="mt-5 text-base leading-relaxed text-slate-400">
              目標還在前方。真正困難的不是知道方向，而是在市場吵鬧時還願意照方向走。
            </p>
          </section>

          <div className="grid gap-5 lg:grid-cols-2">
            <section className="rounded-lg border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-black/20 backdrop-blur">
              <p className="text-sm font-medium text-slate-400">
                預期達標時間
              </p>
              <p className="mt-3 text-3xl font-semibold text-white">
                {goalEta.label}
              </p>
              <p className="mt-3 text-sm font-medium text-cyan-100">
                預期達標時間使用上方投資組合預期年化報酬率估算。
              </p>
              <p className="mt-4 text-sm leading-relaxed text-slate-400">
                這是估算，不是承諾。如果市場會乖乖照 Excel
                表演出，世界上就不需要風險管理了。
              </p>
            </section>

            <section className="rounded-lg border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-black/20 backdrop-blur">
              <p className="text-sm font-medium text-slate-400">
                投資組合預期年化報酬率｜Expected Return
              </p>
              <p className="mt-3 text-3xl font-semibold text-white">
                約 {portfolioExpectedReturn.expectedAnnualReturnPercent.toFixed(1)}%
              </p>
              <div className="mt-4 grid gap-2 text-sm text-slate-300">
                <p>
                  目前總資產：
                  {formatCurrency(currentNetWorth)}
                </p>
                <p>資料來源：{usesHoldings ? '投資標的明細' : '資產配置佔比'}</p>
                {usesHoldings ? (
                  holdingsExpectedReturn.weightedHoldings
                    .map((holding) => {
                      const matchedHolding = goalSettings.holdings.find(
                        (item) => item.id === holding.id,
                      )
                      const shares = matchedHolding?.shares ?? 0
                      const currentPrice = matchedHolding?.currentPrice ?? 0
                      const marketValue = calculateHoldingMarketValue({
                        type: matchedHolding?.type,
                        shares: matchedHolding?.shares,
                        currentPrice: matchedHolding?.currentPrice,
                        fallbackAmount: matchedHolding?.amount,
                      })

                      return (
                        <div
                          className="rounded-lg border border-white/10 bg-slate-950/60 p-3"
                          key={holding.id}
                        >
                          <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                            <p className="font-semibold text-slate-100">
                              {holding.name || '未命名標的'}
                            </p>
                            <p className="text-slate-100">
                              {formatCurrency(marketValue)}
                            </p>
                          </div>
                          <div className="mt-2 grid gap-1 text-xs leading-relaxed text-slate-400 sm:grid-cols-2">
                            {matchedHolding?.type === 'cash' ? (
                              <p>現金金額 / 市值：{formatCurrency(marketValue)}</p>
                            ) : (
                              <p>
                                股數 × 目前股價：
                                {shares > 0 ? shares : '未填'} ×{' '}
                                {currentPrice > 0 ? currentPrice : '未填'}
                              </p>
                            )}
                            <p>權重：{(holding.weight * 100).toFixed(1)}%</p>
                            <p>
                              手動預期年化報酬率：
                              {(holding.expectedAnnualReturn * 100).toFixed(1)}%
                            </p>
                            <p>曝險倍數：{holding.exposureMultiplier ?? 0}x</p>
                          </div>
                        </div>
                      )
                    })
                ) : (
                  <>
                    <p>
                      股票佔比：
                      {Math.round(
                        allocationExpectedReturn.normalizedWeights.stockWeight *
                          100,
                      )}
                      %
                    </p>
                    <p>
                      槓桿股票佔比：
                      {Math.round(
                        allocationExpectedReturn.normalizedWeights
                          .leveragedStockWeight * 100,
                      )}
                      %
                    </p>
                    <p>
                      債券佔比：
                      {Math.round(
                        allocationExpectedReturn.normalizedWeights.bondWeight *
                          100,
                      )}
                      %
                    </p>
                    <p>
                      現金佔比：
                      {Math.round(
                        allocationExpectedReturn.normalizedWeights.cashWeight *
                          100,
                      )}
                      %
                    </p>
                  </>
                )}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-400">
                {usesHoldings
                  ? '投報率由你在設定頁手動輸入的各標的預期年化報酬率加權計算。這不是市場預測，也不是保證報酬；Polaris 只負責把假設算清楚，不負責讓市場乖乖聽話。'
                  : portfolioExpectedReturn.helperText}
              </p>
              {'wasNormalized' in portfolioExpectedReturn &&
              portfolioExpectedReturn.wasNormalized ? (
                <p className="mt-3 rounded-lg border border-amber-200/20 bg-amber-200/10 p-3 text-sm leading-relaxed text-amber-100">
                  佔比合計不是 100%，已正規化後估算。
                </p>
              ) : null}
            </section>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <section className="rounded-lg border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-black/20 backdrop-blur">
              <p className="text-sm font-medium text-slate-400">
                曝險建議｜Exposure Guide
              </p>
              <div className="mt-4 grid gap-3">
                <div className="rounded-lg border border-white/10 bg-slate-950/60 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-sm font-medium text-slate-300">
                      目前投資組合曝險
                    </p>
                    <p className="text-2xl font-semibold text-white">
                      {Math.round(exposureSummary.currentExposurePercent)}%
                    </p>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {exposureSummary.helperText}
                  </p>
                </div>

                <div className="rounded-lg border border-white/10 bg-slate-950/60 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-sm font-medium text-slate-300">
                      最高曝險上限
                    </p>
                    <p className="text-2xl font-semibold text-white">
                      {Math.round(exposureSummary.maxExposurePercent)}%
                    </p>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    這是你在設定頁設定的長期曝險上限，像是你願意接受的最高巡航速度。
                  </p>
                </div>

                <div className="rounded-lg border border-cyan-200/15 bg-cyan-200/[0.06] p-4">
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-sm font-medium text-cyan-100">
                      建議目前曝險
                    </p>
                    <p className="text-2xl font-semibold text-cyan-100">
                      {Math.round(exposureSummary.suggestedExposurePercent)}%
                    </p>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">
                    建議目前曝險是根據市場風險狀態與你的最高曝險上限計算，用於風險控管，不是市場預測或買賣訊號。
                  </p>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                {exposureGapMessage}
              </p>
            </section>
          </div>

          <section className="rounded-lg border border-cyan-200/15 bg-cyan-200/[0.06] p-6 shadow-xl shadow-cyan-950/20 backdrop-blur-xl">
            <p className="text-sm font-medium text-cyan-100">
              今日提醒
            </p>
            <p className="mt-3 text-xl font-semibold leading-relaxed text-white">
              {dailyReminderByTone[simpleMarketRisk.tone]}
            </p>
          </section>
        </div>
      </PageContainer>
    </AppShell>
  )
}

export default WelcomePage
