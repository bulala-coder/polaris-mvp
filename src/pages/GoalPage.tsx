import { useEffect, useRef, useState } from 'react'
import AppShell from '../components/layout/AppShell'
import PageContainer from '../components/layout/PageContainer'
import type { GoalSettings } from '../types/goal'
import {
  readGoalSettings,
  resetGoalSettings,
  writeGoalSettings,
} from '../utils/goalStorage'

type GoalField = keyof GoalSettings
type AllocationField =
  | 'stockWeight'
  | 'leveragedStockWeight'
  | 'bondWeight'
  | 'cashWeight'

const goalFields: Array<{
  key: GoalField
  label: string
  isPercentInput?: boolean
  max?: number
}> = [
  { key: 'currentNetWorth', label: '目前資產｜Current Net Worth' },
  { key: 'targetNetWorth', label: '目標資產｜Target Net Worth' },
  { key: 'monthlyContribution', label: '每月投入｜Monthly Contribution' },
  {
    key: 'maxExposure',
    label: '最高曝險｜Max Exposure',
    isPercentInput: true,
    max: 200,
  },
]
const allocationFields: Array<{
  key: AllocationField
  label: string
}> = [
  { key: 'stockWeight', label: '股票佔比｜Stock Allocation' },
  {
    key: 'leveragedStockWeight',
    label: '槓桿股票佔比｜Leveraged Stock Allocation',
  },
  { key: 'bondWeight', label: '債券佔比｜Bond Allocation' },
  { key: 'cashWeight', label: '現金佔比｜Cash Allocation' },
]

function toSafeNumber(value: string, max?: number) {
  if (value.trim() === '') {
    return 0
  }

  const parsedValue = Number(value)

  if (Number.isNaN(parsedValue)) {
    return 0
  }

  const nonNegativeValue = Math.max(0, parsedValue)

  return typeof max === 'number'
    ? Math.min(max, nonNegativeValue)
    : nonNegativeValue
}

function GoalPage() {
  const skipNextStorageWrite = useRef(false)
  const [goalSettings, setGoalSettings] = useState(() => readGoalSettings())
  const allocationTotal =
    goalSettings.stockWeight +
    goalSettings.leveragedStockWeight +
    goalSettings.bondWeight +
    goalSettings.cashWeight
  const allocationTotalPercent = Math.round(allocationTotal * 100)

  useEffect(() => {
    if (skipNextStorageWrite.current) {
      skipNextStorageWrite.current = false
      return
    }

    writeGoalSettings(goalSettings)
  }, [goalSettings])

  function updateGoalField(
    field: GoalField,
    value: string,
    isPercentInput?: boolean,
    max?: number,
  ) {
    const safeValue = isPercentInput
      ? toSafeNumber(value, max) / 100
      : toSafeNumber(value)

    setGoalSettings({
      ...goalSettings,
      [field]: safeValue,
    })
  }

  function handleReset() {
    skipNextStorageWrite.current = true
    setGoalSettings(resetGoalSettings())
  }

  return (
    <AppShell>
      <PageContainer>
        <div className="mb-8 max-w-3xl">
          <p className="mb-4 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-100">
            目標｜Goal
          </p>
          <h1 className="text-4xl font-semibold tracking-normal text-white sm:text-5xl">
            資產目標
          </h1>
          <p className="mt-5 text-xl leading-relaxed text-slate-300">
            目標頁只用來設定你想前往的方向。Polaris
            會用它計算你離目標還有多遠。
          </p>
        </div>

        <section className="rounded-lg border border-white/10 bg-white/[0.07] p-6 shadow-xl shadow-cyan-950/20 backdrop-blur-xl sm:p-7">
          <div className="grid gap-4 md:grid-cols-2">
            {goalFields.map((field) => (
              <label
                className="grid gap-2 rounded-lg border border-white/10 bg-slate-950/60 p-4"
                key={field.key}
              >
                <span className="text-sm font-medium text-slate-400">
                  {field.label}
                </span>
                <input
                  className="min-h-11 rounded-lg border border-white/10 bg-slate-950 px-3 text-base text-slate-100 outline-none transition focus:border-cyan-200/60"
                  min="0"
                  onChange={(event) =>
                    updateGoalField(
                      field.key,
                      event.target.value,
                      field.isPercentInput,
                      field.max,
                    )
                  }
                  max={field.max}
                  type="number"
                  value={
                    field.isPercentInput
                      ? Math.round(goalSettings[field.key] * 100)
                      : goalSettings[field.key]
                  }
                />
              </label>
            ))}
          </div>

          <div className="mt-5">
            <h2 className="text-xl font-semibold text-white">
              資產佔比
            </h2>
            <p className="mt-3 rounded-lg border border-white/10 bg-slate-950/60 p-4 text-sm leading-relaxed text-slate-400">
              Polaris
              會根據這些佔比估算目前投資組合的預期年化報酬率。這不是水晶球，只是把資產配置放進一個比較不會講大話的計算機。
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {allocationFields.map((field) => (
                <label
                  className="grid gap-2 rounded-lg border border-white/10 bg-slate-950/60 p-4"
                  key={field.key}
                >
                  <span className="text-sm font-medium text-slate-400">
                    {field.label}
                  </span>
                  <input
                    className="min-h-11 rounded-lg border border-white/10 bg-slate-950 px-3 text-base text-slate-100 outline-none transition focus:border-cyan-200/60"
                    max="200"
                    min="0"
                    onChange={(event) =>
                      updateGoalField(field.key, event.target.value, true, 200)
                    }
                    type="number"
                    value={Math.round(goalSettings[field.key] * 100)}
                  />
                </label>
              ))}
            </div>
            <p className="mt-4 rounded-lg border border-white/10 bg-slate-950/60 p-4 text-sm leading-relaxed text-slate-400">
              目前佔比合計：{allocationTotalPercent}%
              {allocationTotalPercent !== 100
                ? '。佔比合計不是 100%，Polaris 會先正規化後再估算。放心，計算機不會因為你少填 1% 就翻桌。'
                : '。佔比看起來剛好，計算機今天不用深呼吸。'}
            </p>
          </div>

          <p className="mt-5 rounded-lg border border-white/10 bg-slate-950/60 p-4 text-sm leading-relaxed text-slate-400">
            最高曝險是你的油門上限。150% 代表最多 1.5
            倍曝險，但油門裝得深，不代表每天都該踩到底。
          </p>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-relaxed text-slate-400">
              目標資料會儲存在此瀏覽器的 localStorage，並用於首頁的資產目標進度。
            </p>
            <button
              className="rounded-lg border border-cyan-200/30 bg-cyan-200/10 px-5 py-3 text-base font-semibold text-cyan-50 shadow-[0_0_32px_rgba(34,211,238,0.12)] transition hover:border-cyan-100/60 hover:bg-cyan-200/15 focus:outline-none focus:ring-2 focus:ring-cyan-200/70"
              onClick={handleReset}
              type="button"
            >
              重設示範目標
            </button>
          </div>
        </section>
      </PageContainer>
    </AppShell>
  )
}

export default GoalPage
