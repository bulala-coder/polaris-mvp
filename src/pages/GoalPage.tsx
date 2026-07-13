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
const allocationPresets: Array<{
  label: string
  weights: Record<AllocationField, number>
}> = [
  {
    label: '平衡型',
    weights: {
      stockWeight: 0.45,
      leveragedStockWeight: 0.15,
      bondWeight: 0.3,
      cashWeight: 0.1,
    },
  },
  {
    label: '積極型',
    weights: {
      stockWeight: 0.5,
      leveragedStockWeight: 0.35,
      bondWeight: 0.1,
      cashWeight: 0.05,
    },
  },
  {
    label: '保守型',
    weights: {
      stockWeight: 0.35,
      leveragedStockWeight: 0,
      bondWeight: 0.45,
      cashWeight: 0.2,
    },
  },
  {
    label: '我的目前示範配置',
    weights: {
      stockWeight: 0.4,
      leveragedStockWeight: 0.4,
      bondWeight: 0.15,
      cashWeight: 0.05,
    },
  },
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

function parsePercentInput(value: string): number {
  if (value.trim() === '') {
    return 0
  }

  const parsedValue = Number(value)

  if (Number.isNaN(parsedValue)) {
    return 0
  }

  return Math.min(200, Math.max(0, parsedValue))
}

function toStoredWeight(percent: number): number {
  return percent / 100
}

function formatPercentNumber(value: number): string {
  return Number((value).toFixed(2)).toString()
}

function formatWeightForInput(weight: number): string {
  return formatPercentNumber(weight * 100)
}

function buildAllocationInputValues(goalSettings: GoalSettings) {
  return allocationFields.reduce(
    (inputValues, field) => ({
      ...inputValues,
      [field.key]: formatWeightForInput(goalSettings[field.key]),
    }),
    {} as Record<AllocationField, string>,
  )
}

function GoalPage() {
  const skipNextStorageWrite = useRef(false)
  const [goalSettings, setGoalSettings] = useState(() => readGoalSettings())
  const [allocationInputValues, setAllocationInputValues] = useState(() =>
    buildAllocationInputValues(readGoalSettings()),
  )
  const allocationTotal =
    goalSettings.stockWeight +
    goalSettings.leveragedStockWeight +
    goalSettings.bondWeight +
    goalSettings.cashWeight
  const allocationTotalPercent = formatPercentNumber(allocationTotal * 100)

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

  function updateAllocationInput(field: AllocationField, value: string) {
    if (/^\d*\.?\d*$/.test(value)) {
      setAllocationInputValues({
        ...allocationInputValues,
        [field]: value,
      })
    }
  }

  function commitAllocationField(field: AllocationField) {
    const percent = parsePercentInput(allocationInputValues[field])
    const nextGoalSettings = {
      ...goalSettings,
      [field]: toStoredWeight(percent),
    }

    setGoalSettings(nextGoalSettings)
    setAllocationInputValues({
      ...allocationInputValues,
      [field]: formatPercentNumber(percent),
    })
  }

  function applyAllocationPreset(weights: Record<AllocationField, number>) {
    const nextGoalSettings = {
      ...goalSettings,
      ...weights,
    }

    setGoalSettings(nextGoalSettings)
    setAllocationInputValues(buildAllocationInputValues(nextGoalSettings))
  }

  function handleReset() {
    const defaultGoalSettings = resetGoalSettings()

    skipNextStorageWrite.current = true
    setGoalSettings(defaultGoalSettings)
    setAllocationInputValues(buildAllocationInputValues(defaultGoalSettings))
  }

  return (
    <AppShell>
      <PageContainer>
        <div className="mb-8 max-w-3xl">
          <p className="mb-4 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-100">
            設定｜Settings
          </p>
          <h1 className="text-4xl font-semibold tracking-normal text-white sm:text-5xl">
            設定｜Settings
          </h1>
          <p className="mt-5 text-xl leading-relaxed text-slate-300">
            填入你的總資產、資產配置與風險上限。Polaris
            會負責把數字翻譯成人話，至少它會努力不要講大話。
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
            <div className="mt-4">
              <p className="text-sm font-medium text-slate-400">
                快速配置
              </p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {allocationPresets.map((preset) => (
                  <button
                    className="rounded-lg border border-cyan-200/25 bg-cyan-200/10 px-4 py-3 text-sm font-semibold text-cyan-50 transition hover:border-cyan-100/60 hover:bg-cyan-200/15 focus:outline-none focus:ring-2 focus:ring-cyan-200/60"
                    key={preset.label}
                    onClick={() => applyAllocationPreset(preset.weights)}
                    type="button"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
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
                    inputMode="decimal"
                    onChange={(event) =>
                      updateAllocationInput(field.key, event.target.value)
                    }
                    onBlur={() => commitAllocationField(field.key)}
                    pattern="[0-9]*[.]?[0-9]*"
                    type="text"
                    value={allocationInputValues[field.key]}
                  />
                </label>
              ))}
            </div>
            <p className="mt-4 rounded-lg border border-white/10 bg-slate-950/60 p-4 text-sm leading-relaxed text-slate-400">
              目前佔比合計：{allocationTotalPercent}%
              {allocationTotalPercent !== '100'
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

          <section className="mt-5 rounded-lg border border-white/10 bg-slate-950/60 p-4 text-sm leading-relaxed text-slate-400">
            <h2 className="text-base font-semibold text-slate-100">
              產品邊界
            </h2>
            <p className="mt-3">
              Polaris 是本機原型工具，用於投資風險整理、資產目標估算與投資組合假設報酬率顯示。它不提供個股推薦、短線交易訊號、市場預測或保證報酬。
            </p>
            <p className="mt-3 text-xs text-slate-500">
              Polaris v0.3.9｜Simplified local prototype
            </p>
          </section>
        </section>
      </PageContainer>
    </AppShell>
  )
}

export default GoalPage
