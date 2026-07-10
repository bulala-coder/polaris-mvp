import type { UserPosition } from '../../types/userPosition'

type UserPositionEditorProps = {
  userPosition: UserPosition
  onUserPositionChange: (userPosition: UserPosition) => void
  onReset: () => void
}

type NumericUserPositionField =
  | 'age'
  | 'investmentHorizonYears'
  | 'monthlyContribution'
  | 'cashReserveMonths'
  | 'maxAcceptableDrawdown'

const numericFields: Array<{
  key: NumericUserPositionField
  label: string
  max?: number
}> = [
  { key: 'age', label: 'Age' },
  { key: 'investmentHorizonYears', label: 'Investment horizon years' },
  { key: 'monthlyContribution', label: 'Monthly contribution' },
  { key: 'cashReserveMonths', label: 'Cash reserve months' },
  { key: 'maxAcceptableDrawdown', label: 'Max acceptable drawdown', max: 100 },
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

function UserPositionEditor({
  userPosition,
  onUserPositionChange,
  onReset,
}: UserPositionEditorProps) {
  function updateNumberField(
    field: NumericUserPositionField,
    value: string,
    max?: number,
  ) {
    onUserPositionChange({
      ...userPosition,
      [field]: toSafeNumber(value, max),
    })
  }

  function updateUsesLeverage(value: boolean) {
    onUserPositionChange({
      ...userPosition,
      usesLeverage: value,
    })
  }

  return (
    <section className="rounded-lg border border-white/10 bg-white/[0.07] p-6 shadow-xl shadow-cyan-950/20 backdrop-blur-xl sm:p-7">
      <div className="mb-6 max-w-3xl">
        <h2 className="text-2xl font-semibold text-white">User Position</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          User Position helps Polaris understand your life context before
          interpreting portfolio and market risk. Saved in this browser using
          localStorage.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {numericFields.map((field) => (
          <label
            className="grid gap-2 rounded-lg border border-white/10 bg-slate-950/60 p-4"
            key={field.key}
          >
            <span className="text-sm font-medium text-slate-400">
              {field.label}
            </span>
            <input
              className="min-h-11 rounded-lg border border-white/10 bg-slate-950 px-3 text-base text-slate-100 outline-none transition focus:border-cyan-200/60"
              max={field.max}
              min="0"
              onChange={(event) =>
                updateNumberField(field.key, event.target.value, field.max)
              }
              type="number"
              value={userPosition[field.key]}
            />
          </label>
        ))}

        <label className="grid gap-2 rounded-lg border border-white/10 bg-slate-950/60 p-4">
          <span className="text-sm font-medium text-slate-400">
            Uses leverage
          </span>
          <select
            className="min-h-11 rounded-lg border border-white/10 bg-slate-950 px-3 text-base text-slate-100 outline-none transition focus:border-cyan-200/60"
            onChange={(event) => updateUsesLeverage(event.target.value === 'yes')}
            value={userPosition.usesLeverage ? 'yes' : 'no'}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>
      </div>

      <button
        className="mt-5 rounded-lg border border-cyan-200/30 bg-cyan-200/10 px-5 py-3 text-base font-semibold text-cyan-50 shadow-[0_0_32px_rgba(34,211,238,0.12)] transition hover:border-cyan-100/60 hover:bg-cyan-200/15 focus:outline-none focus:ring-2 focus:ring-cyan-200/70"
        onClick={onReset}
        type="button"
      >
        Reset demo user position
      </button>
    </section>
  )
}

export default UserPositionEditor
