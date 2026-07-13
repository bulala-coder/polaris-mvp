import { useEffect, useRef, useState } from 'react'
import AppShell from '../components/layout/AppShell'
import PageContainer from '../components/layout/PageContainer'
import type { GoalSettings, HoldingType, PortfolioHolding } from '../types/goal'
import {
  readGoalSettings,
  resetGoalSettings,
  writeGoalSettings,
} from '../utils/goalStorage'
import { getHoldingsTotalValue } from '../utils/holdingCalculations'
import { calculateHoldingMarketValue } from '../utils/holdingValueCalculations'

type GoalField =
  | 'currentNetWorth'
  | 'targetNetWorth'
  | 'monthlyContribution'
  | 'maxExposure'
type AllocationField =
  | 'stockWeight'
  | 'leveragedStockWeight'
  | 'bondWeight'
  | 'cashWeight'
type HoldingDecimalField =
  | 'amount'
  | 'shares'
  | 'currentPrice'
  | 'expectedAnnualReturn'
  | 'exposureMultiplier'

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
const holdingTypeOptions: Array<{
  label: string
  value: HoldingType
}> = [
  { label: '股票', value: 'stock' },
  { label: '槓桿股票', value: 'leveraged_stock' },
  { label: '債券', value: 'bond' },
  { label: '現金', value: 'cash' },
  { label: '其他', value: 'other' },
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

function parseDecimalInput(value: string): number {
  const parsedValue = Number(value)

  if (!Number.isFinite(parsedValue) || parsedValue < 0) {
    return 0
  }

  return parsedValue
}

function isDecimalInput(value: string): boolean {
  return /^\d*\.?\d*$/.test(value)
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

function formatHoldingDecimalForInput(
  holding: PortfolioHolding,
  field: HoldingDecimalField,
): string {
  if (field === 'expectedAnnualReturn') {
    return formatPercentNumber(holding.expectedAnnualReturn * 100)
  }

  return String(holding[field] ?? 0)
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('zh-TW', {
    style: 'currency',
    currency: 'TWD',
    maximumFractionDigits: 0,
  }).format(value)
}

function createEmptyHolding(): PortfolioHolding {
  return {
    id: `holding-${Date.now()}`,
    name: '',
    amount: 0,
    shares: 0,
    currentPrice: 0,
    type: 'stock',
    expectedAnnualReturn: 0,
    exposureMultiplier: 1,
    returnSource: 'manual',
    assumptionReason: '請手動輸入此標的的長期年化報酬率假設。',
  }
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
  const [holdingInputValues, setHoldingInputValues] = useState<
    Record<string, Partial<Record<HoldingDecimalField, string>>>
  >({})
  const [allocationInputValues, setAllocationInputValues] = useState(() =>
    buildAllocationInputValues(readGoalSettings()),
  )
  const allocationTotal =
    goalSettings.stockWeight +
    goalSettings.leveragedStockWeight +
    goalSettings.bondWeight +
    goalSettings.cashWeight
  const allocationTotalPercent = formatPercentNumber(allocationTotal * 100)
  const holdingsTotalValue = getHoldingsTotalValue(goalSettings.holdings)

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
    if (isDecimalInput(value)) {
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

  function updateHolding(
    holdingId: string,
    updates: Partial<PortfolioHolding>,
  ) {
    setGoalSettings({
      ...goalSettings,
      holdings: goalSettings.holdings.map((holding) =>
        holding.id === holdingId ? { ...holding, ...updates } : holding,
      ),
    })
  }

  function getHoldingInputValue(
    holding: PortfolioHolding,
    field: HoldingDecimalField,
  ) {
    return (
      holdingInputValues[holding.id]?.[field] ??
      formatHoldingDecimalForInput(holding, field)
    )
  }

  function setHoldingInputValue(
    holdingId: string,
    field: HoldingDecimalField,
    value: string,
  ) {
    setHoldingInputValues({
      ...holdingInputValues,
      [holdingId]: {
        ...holdingInputValues[holdingId],
        [field]: value,
      },
    })
  }

  function clearHoldingInputValue(
    holdingId: string,
    field: HoldingDecimalField,
  ) {
    const nextHoldingInputValues = {
      ...holdingInputValues,
      [holdingId]: {
        ...holdingInputValues[holdingId],
      },
    }

    delete nextHoldingInputValues[holdingId][field]

    if (Object.keys(nextHoldingInputValues[holdingId]).length === 0) {
      delete nextHoldingInputValues[holdingId]
    }

    setHoldingInputValues(nextHoldingInputValues)
  }

  function updateHoldingDecimalInput(
    holding: PortfolioHolding,
    field: HoldingDecimalField,
    value: string,
  ) {
    if (!isDecimalInput(value)) {
      return
    }

    setHoldingInputValue(holding.id, field, value)

    if (value === '' || value === '.') {
      return
    }

    const parsedValue = parseDecimalInput(value)

    if (field === 'amount') {
      updateHolding(holding.id, { amount: parsedValue })
      return
    }

    if (field === 'shares') {
      updateHolding(holding.id, {
        shares: parsedValue,
        amount: calculateHoldingMarketValue({
          type: holding.type,
          shares: parsedValue,
          currentPrice: holding.currentPrice,
          fallbackAmount: holding.amount,
        }),
      })
      return
    }

    if (field === 'currentPrice') {
      updateHolding(holding.id, {
        currentPrice: parsedValue,
        amount: calculateHoldingMarketValue({
          type: holding.type,
          shares: holding.shares,
          currentPrice: parsedValue,
          fallbackAmount: holding.amount,
        }),
      })
      return
    }

    if (field === 'expectedAnnualReturn') {
      updateHolding(holding.id, {
        expectedAnnualReturn: parsedValue / 100,
        returnSource: 'manual',
        assumptionReason:
          '請手動輸入你對此標的的長期年化報酬率假設。這不是預測，只是你拿來估算投資組合的假設。',
      })
      return
    }

    updateHolding(holding.id, { exposureMultiplier: parsedValue })
  }

  function commitHoldingDecimalInput(
    holding: PortfolioHolding,
    field: HoldingDecimalField,
  ) {
    const value = holdingInputValues[holding.id]?.[field]

    if (typeof value !== 'string') {
      return
    }

    updateHoldingDecimalInput(holding, field, String(parseDecimalInput(value)))
    clearHoldingInputValue(holding.id, field)
  }

  function updateHoldingType(holding: PortfolioHolding, type: HoldingType) {
    const currentMarketValue = calculateHoldingMarketValue({
      type: holding.type,
      shares: holding.shares,
      currentPrice: holding.currentPrice,
      fallbackAmount: holding.amount,
    })

    updateHolding(holding.id, {
      type,
      amount: type === 'cash' ? currentMarketValue : holding.amount,
    })
  }

  function addHolding() {
    setGoalSettings({
      ...goalSettings,
      holdings: [...goalSettings.holdings, createEmptyHolding()],
    })
  }

  function removeHolding(holdingId: string) {
    setGoalSettings({
      ...goalSettings,
      holdings: goalSettings.holdings.filter(
        (holding) => holding.id !== holdingId,
      ),
    })
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
              投資標的｜Holdings
            </h2>
            <p className="mt-3 rounded-lg border border-white/10 bg-slate-950/60 p-4 text-sm leading-relaxed text-slate-400">
              先選類型，再輸入標的資料。現金直接填金額；股票、ETF、債券則用股數
              × 目前股價計算市值。順序很重要，連計算機也不喜歡先猜題目。
            </p>

            <div className="mt-4 grid gap-4">
              {goalSettings.holdings.length === 0 ? (
                <div className="rounded-lg border border-white/10 bg-slate-950/60 p-5">
                  <h3 className="text-lg font-semibold text-white">
                    尚未新增投資標的
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">
                    請新增你的股票、ETF、債券或現金。Polaris
                    不會預設任何投資組合，因為它不想假裝比你更懂你的錢。
                  </p>
                </div>
              ) : null}
              {goalSettings.holdings.map((holding) => (
                <article
                  className="rounded-lg border border-white/10 bg-slate-950/60 p-4"
                  key={holding.id}
                >
                  <div className="grid gap-4 lg:grid-cols-2">
                    <label className="grid gap-2">
                      <span className="text-sm font-medium text-slate-400">
                        類型
                      </span>
                      <select
                        className="min-h-11 rounded-lg border border-white/10 bg-slate-950 px-3 text-base text-slate-100 outline-none transition focus:border-cyan-200/60"
                        onChange={(event) =>
                          updateHoldingType(
                            holding,
                            event.target.value as HoldingType,
                          )
                        }
                        value={holding.type}
                      >
                        {holdingTypeOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="grid gap-2">
                      <span className="text-sm font-medium text-slate-400">
                        {holding.type === 'cash' ? '名稱' : '名稱 / 代號'}
                      </span>
                      <input
                        className="min-h-11 rounded-lg border border-white/10 bg-slate-950 px-3 text-base text-slate-100 outline-none transition focus:border-cyan-200/60"
                        onChange={(event) =>
                          updateHolding(holding.id, {
                            name: event.target.value,
                          })
                        }
                        type="text"
                        value={holding.name}
                      />
                    </label>

                    {holding.type === 'cash' ? (
                      <label className="grid gap-2">
                        <span className="text-sm font-medium text-slate-400">
                          現金金額
                        </span>
                        <input
                          className="min-h-11 rounded-lg border border-white/10 bg-slate-950 px-3 text-base text-slate-100 outline-none transition focus:border-cyan-200/60"
                          inputMode="decimal"
                          onBlur={() =>
                            commitHoldingDecimalInput(holding, 'amount')
                          }
                          onChange={(event) =>
                            updateHoldingDecimalInput(
                              holding,
                              'amount',
                              event.target.value,
                            )
                          }
                          step="0.01"
                          type="text"
                          value={getHoldingInputValue(holding, 'amount')}
                        />
                      </label>
                    ) : (
                      <>
                        <label className="grid gap-2">
                          <span className="text-sm font-medium text-slate-400">
                            持有股數
                          </span>
                          <input
                            className="min-h-11 rounded-lg border border-white/10 bg-slate-950 px-3 text-base text-slate-100 outline-none transition focus:border-cyan-200/60"
                            inputMode="decimal"
                            onBlur={() =>
                              commitHoldingDecimalInput(holding, 'shares')
                            }
                            onChange={(event) =>
                              updateHoldingDecimalInput(
                                holding,
                                'shares',
                                event.target.value,
                              )
                            }
                            step="0.01"
                            type="text"
                            value={getHoldingInputValue(holding, 'shares')}
                          />
                        </label>

                        <label className="grid gap-2">
                          <span className="text-sm font-medium text-slate-400">
                            目前股價
                          </span>
                          <input
                            className="min-h-11 rounded-lg border border-white/10 bg-slate-950 px-3 text-base text-slate-100 outline-none transition focus:border-cyan-200/60"
                            inputMode="decimal"
                            onBlur={() =>
                              commitHoldingDecimalInput(
                                holding,
                                'currentPrice',
                              )
                            }
                            onChange={(event) =>
                              updateHoldingDecimalInput(
                                holding,
                                'currentPrice',
                                event.target.value,
                              )
                            }
                            step="0.01"
                            type="text"
                            value={getHoldingInputValue(
                              holding,
                              'currentPrice',
                            )}
                          />
                        </label>
                      </>
                    )}

                    <div className="grid gap-2 rounded-lg border border-white/10 bg-slate-950 p-4">
                      <span className="text-sm font-medium text-slate-400">
                        目前市值
                      </span>
                      <p className="text-xl font-semibold text-white">
                        {formatCurrency(
                          calculateHoldingMarketValue({
                            type: holding.type,
                            shares: holding.shares,
                            currentPrice: holding.currentPrice,
                            fallbackAmount: holding.amount,
                          }),
                        )}
                      </p>
                      <span className="text-xs text-slate-500">
                        {holding.type === 'cash'
                          ? '現金直接以金額作為市值，不需要股數或股價。'
                          : '由持有股數 × 目前股價自動計算，不需要連網。'}
                      </span>
                    </div>

                    <label className="grid gap-2">
                      <span className="text-sm font-medium text-slate-400">
                        預期年化報酬率
                      </span>
                      <input
                        className="min-h-11 rounded-lg border border-white/10 bg-slate-950 px-3 text-base text-slate-100 outline-none transition focus:border-cyan-200/60"
                        inputMode="decimal"
                        onBlur={() =>
                          commitHoldingDecimalInput(
                            holding,
                            'expectedAnnualReturn',
                          )
                        }
                        onChange={(event) =>
                          updateHoldingDecimalInput(
                            holding,
                            'expectedAnnualReturn',
                            event.target.value,
                          )
                        }
                        step="0.1"
                        type="text"
                        value={getHoldingInputValue(
                          holding,
                          'expectedAnnualReturn',
                        )}
                      />
                      <span className="text-xs text-slate-500">
                        請手動輸入你對此標的的長期年化報酬率假設。這不是預測，只是你拿來估算投資組合的假設。
                      </span>
                    </label>

                    <label className="grid gap-2">
                      <span className="text-sm font-medium text-slate-400">
                        曝險倍數
                      </span>
                      <input
                        className="min-h-11 rounded-lg border border-white/10 bg-slate-950 px-3 text-base text-slate-100 outline-none transition focus:border-cyan-200/60"
                        inputMode="decimal"
                        onBlur={() =>
                          commitHoldingDecimalInput(
                            holding,
                            'exposureMultiplier',
                          )
                        }
                        onChange={(event) =>
                          updateHoldingDecimalInput(
                            holding,
                            'exposureMultiplier',
                            event.target.value,
                          )
                        }
                        step="0.1"
                        type="text"
                        value={getHoldingInputValue(
                          holding,
                          'exposureMultiplier',
                        )}
                      />
                    </label>

                  </div>

                  <p className="mt-4 rounded-lg border border-white/10 bg-slate-950 p-3 text-sm leading-relaxed text-slate-400">
                    {holding.assumptionReason}
                  </p>

                  <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                    <button
                      className="rounded-lg border border-red-200/20 bg-red-200/10 px-4 py-3 text-sm font-semibold text-red-100 transition hover:border-red-100/50 hover:bg-red-200/15"
                      onClick={() => removeHolding(holding.id)}
                      type="button"
                    >
                      刪除
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <button
              className="mt-4 rounded-lg border border-cyan-200/30 bg-cyan-200/10 px-5 py-3 text-base font-semibold text-cyan-50 shadow-[0_0_32px_rgba(34,211,238,0.12)] transition hover:border-cyan-100/60 hover:bg-cyan-200/15"
              onClick={addHolding}
              type="button"
            >
              新增標的
            </button>

            {Math.abs(holdingsTotalValue - goalSettings.currentNetWorth) > 1 ? (
              <p className="mt-4 rounded-lg border border-amber-200/20 bg-amber-200/10 p-4 text-sm leading-relaxed text-amber-100">
                投資標的金額合計與目前總資產不同。首頁會優先使用投資標的合計。數字吵架時，Polaris
                先相信你列出來的明細。
              </p>
            ) : null}
          </div>

          <div className="mt-5">
            <h2 className="text-xl font-semibold text-white">
              資產佔比 fallback
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
              Polaris v0.4.6｜Simplified local prototype
            </p>
          </section>
        </section>
      </PageContainer>
    </AppShell>
  )
}

export default GoalPage
