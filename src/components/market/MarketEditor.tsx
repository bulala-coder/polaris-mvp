import type { DataConfidenceLevel, MarketInput } from '../../types/market'

type MarketEditorProps = {
  marketInput: MarketInput
  onMarketInputChange: (marketInput: MarketInput) => void
}

type MarketScoreField =
  | 'valuationScore'
  | 'momentumScore'
  | 'volatilityScore'
  | 'interestRateScore'
  | 'businessCycleScore'
  | 'creditRiskScore'
  | 'sentimentScore'

const scoreFields: Array<{
  key: MarketScoreField
  label: string
  helperText: string
}> = [
  { key: 'valuationScore', label: '估值分數｜Valuation', helperText: '估值' },
  { key: 'momentumScore', label: '動能分數｜Momentum', helperText: '動能' },
  { key: 'volatilityScore', label: '波動分數｜Volatility', helperText: '波動度' },
  {
    key: 'interestRateScore',
    label: '利率分數｜Interest Rate',
    helperText: '利率環境',
  },
  {
    key: 'businessCycleScore',
    label: '景氣分數｜Business Cycle',
    helperText: '景氣循環',
  },
  { key: 'creditRiskScore', label: '信用風險分數｜Credit Risk', helperText: '信用風險' },
  { key: 'sentimentScore', label: '市場情緒分數｜Sentiment', helperText: '市場情緒' },
]

function clampScore(value: string) {
  if (value.trim() === '') {
    return 0
  }

  const parsedValue = Number(value)

  if (Number.isNaN(parsedValue)) {
    return 0
  }

  return Math.min(100, Math.max(0, parsedValue))
}

function MarketEditor({
  marketInput,
  onMarketInputChange,
}: MarketEditorProps) {
  function updateScore(field: MarketScoreField, value: string) {
    onMarketInputChange({
      ...marketInput,
      [field]: clampScore(value),
    })
  }

  function updateConfidenceLevel(value: DataConfidenceLevel) {
    onMarketInputChange({
      ...marketInput,
      dataConfidenceLevel: value,
    })
  }

  return (
    <section className="rounded-lg border border-white/10 bg-white/[0.07] p-6 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl sm:p-8">
      <div className="mb-6 max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-[0.28em] text-cyan-200/80">
          v0.2.2
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-white">
          編輯市場資料｜Edit Market Data
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          市場資料變更會儲存在此瀏覽器的 localStorage。若要恢復原始示範市場資料，請使用重設示範市場資料。
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {scoreFields.map((field) => (
          <label
            className="grid gap-2 rounded-lg border border-white/10 bg-slate-950/60 p-4"
            key={field.key}
          >
            <span className="text-sm font-medium text-slate-400">
              {field.label}
            </span>
            <input
              className="min-h-11 rounded-lg border border-white/10 bg-slate-950 px-3 text-base text-slate-100 outline-none transition focus:border-cyan-200/60"
              max="100"
              min="0"
              onChange={(event) => updateScore(field.key, event.target.value)}
              type="number"
              value={marketInput[field.key]}
            />
            <span className="text-xs text-slate-500">{field.helperText}</span>
          </label>
        ))}

        <label className="grid gap-2 rounded-lg border border-white/10 bg-slate-950/60 p-4">
          <span className="text-sm font-medium text-slate-400">
            資料信心度｜Data Confidence
          </span>
          <select
            className="min-h-11 rounded-lg border border-white/10 bg-slate-950 px-3 text-base text-slate-100 outline-none transition focus:border-cyan-200/60"
            onChange={(event) =>
              updateConfidenceLevel(event.target.value as DataConfidenceLevel)
            }
            value={marketInput.dataConfidenceLevel}
          >
            <option value="low">低｜low</option>
            <option value="medium">中｜medium</option>
            <option value="high">高｜high</option>
          </select>
          <span className="text-xs text-slate-500">low / medium / high</span>
        </label>
      </div>
    </section>
  )
}

export default MarketEditor
