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
}> = [
  { key: 'currentNetWorth', label: '目前資產｜Current Net Worth' },
  { key: 'targetNetWorth', label: '目標資產｜Target Net Worth' },
  { key: 'monthlyContribution', label: '每月投入｜Monthly Contribution' },
]

function toSafeNumber(value: string) {
  if (value.trim() === '') {
    return 0
  }

  const parsedValue = Number(value)

  if (Number.isNaN(parsedValue)) {
    return 0
  }

  return Math.max(0, parsedValue)
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

  function updateGoalField(field: GoalField, value: string) {
    setGoalSettings({
      ...goalSettings,
      [field]: toSafeNumber(value),
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
          <div className="grid gap-4 md:grid-cols-3">
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
                    updateGoalField(field.key, event.target.value)
                  }
                  type="number"
                  value={goalSettings[field.key]}
                />
              </label>
            ))}
          </div>

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
