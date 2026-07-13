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
    key: 'expectedAnnualReturn',
    label: '預期年化報酬率｜Expected Annual Return',
    isPercentInput: true,
    max: 20,
  },
  {
    key: 'maxExposure',
    label: '最高曝險｜Max Exposure',
    isPercentInput: true,
    max: 200,
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

function GoalPage() {
  const skipNextStorageWrite = useRef(false)
  const [goalSettings, setGoalSettings] = useState(() => readGoalSettings())

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

          <p className="mt-5 rounded-lg border border-white/10 bg-slate-950/60 p-4 text-sm leading-relaxed text-slate-400">
            這只是估算用假設，不是承諾。保守一點通常比較無聊，但投資裡很多好事本來就很無聊。這個數字會同時用於預期達標時間與
            10 年資產估算。
          </p>

          <p className="mt-3 rounded-lg border border-white/10 bg-slate-950/60 p-4 text-sm leading-relaxed text-slate-400">
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
