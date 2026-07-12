import AppShell from '../components/layout/AppShell'
import PageContainer from '../components/layout/PageContainer'
import { mockMarketInput } from '../data/mockData'
import { readGoalSettings } from '../utils/goalStorage'
import { buildMarketScore } from '../utils/marketCalculations'
import { readFromStorage, storageKeys } from '../utils/storage'

function formatCurrency(value: number) {
  return new Intl.NumberFormat('zh-TW', {
    style: 'currency',
    currency: 'TWD',
    maximumFractionDigits: 0,
  }).format(value)
}

function calculateGoalProgress(currentNetWorth: number, targetNetWorth: number) {
  if (targetNetWorth <= 0) {
    return 0
  }

  return Math.min(100, Math.max(0, (currentNetWorth / targetNetWorth) * 100))
}

function WelcomePage() {
  const marketInput = readFromStorage(storageKeys.marketInput, mockMarketInput)
  const marketScore = buildMarketScore(marketInput)
  const goalSettings = readGoalSettings()
  const progress = calculateGoalProgress(
    goalSettings.currentNetWorth,
    goalSettings.targetNetWorth,
  )
  const remainingAmount = Math.max(
    0,
    goalSettings.targetNetWorth - goalSettings.currentNetWorth,
  )

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
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-3xl font-semibold text-cyan-100">
                  Level {marketScore.marketRiskLevel}｜{marketScore.marketRiskLabel}
                </p>
                <p className="mt-2 text-sm text-slate-400">
                  市場風險等級
                </p>
              </div>
              <div>
                <p className="text-3xl font-semibold text-white">
                  {marketScore.marketRiskScore.toFixed(1)}
                </p>
                <p className="mt-2 text-sm text-slate-400">
                  市場風險分數
                </p>
              </div>
            </div>
            <p className="mt-5 border-t border-white/10 pt-5 text-base leading-relaxed text-slate-300">
              目前市場風險偏高，適合維持紀律，不適合因短期情緒大幅加碼。
            </p>
          </section>

          <section className="rounded-lg border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-black/20 backdrop-blur sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">
                  資產目標進度
                </p>
                <p className="mt-3 text-4xl font-semibold text-white">
                  {progress.toFixed(0)}%
                </p>
              </div>
              <div className="grid gap-2 text-sm text-slate-300 sm:text-right">
                <p>目前資產：{formatCurrency(goalSettings.currentNetWorth)}</p>
                <p>目標資產：{formatCurrency(goalSettings.targetNetWorth)}</p>
                <p>距離目標還差：{formatCurrency(remainingAmount)}</p>
              </div>
            </div>

            <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-cyan-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="mt-5 text-base leading-relaxed text-slate-400">
              以目前每月投入 {formatCurrency(goalSettings.monthlyContribution)}
              估算，距離目標仍需要很長時間。Polaris
              會把這件事呈現得清楚，但不做誇張承諾。
            </p>
          </section>

          <section className="rounded-lg border border-cyan-200/15 bg-cyan-200/[0.06] p-6 shadow-xl shadow-cyan-950/20 backdrop-blur-xl">
            <p className="text-sm font-medium text-cyan-100">
              今日提醒
            </p>
            <p className="mt-3 text-xl font-semibold leading-relaxed text-white">
              今天不需要追逐市場。重點是維持投入、控制曝險，讓資產穩定朝目標前進。
            </p>
          </section>
        </div>
      </PageContainer>
    </AppShell>
  )
}

export default WelcomePage
