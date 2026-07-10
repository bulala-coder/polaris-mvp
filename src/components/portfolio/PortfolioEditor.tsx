import type { PortfolioAsset } from '../../types/portfolio'

type PortfolioEditorProps = {
  assets: PortfolioAsset[]
  onAssetsChange: (assets: PortfolioAsset[]) => void
}

type EditableAssetField =
  | 'name'
  | 'currentValue'
  | 'targetWeight'
  | 'assetType'
  | 'exposureMultiplier'

function toSafeNumber(value: string) {
  if (value.trim() === '') {
    return 0
  }

  const parsedValue = Number(value)

  return Number.isNaN(parsedValue) ? 0 : parsedValue
}

function PortfolioEditor({ assets, onAssetsChange }: PortfolioEditorProps) {
  function updateAsset(
    id: string,
    field: EditableAssetField,
    value: string,
  ) {
    onAssetsChange(
      assets.map((asset) => {
        if (asset.id !== id) {
          return asset
        }

        if (
          field === 'currentValue' ||
          field === 'targetWeight' ||
          field === 'exposureMultiplier'
        ) {
          return {
            ...asset,
            [field]: toSafeNumber(value),
          }
        }

        return {
          ...asset,
          [field]: value,
        }
      }),
    )
  }

  return (
    <section className="rounded-lg border border-white/10 bg-white/[0.07] p-6 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl sm:p-8">
      <div className="mb-6 max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-[0.28em] text-cyan-200/80">
          v0.2.1
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-white">
          Edit Portfolio
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          Portfolio changes are saved in this browser using localStorage. Use
          Reset demo data to restore the original demo portfolio.
        </p>
      </div>

      <div className="grid gap-4">
        {assets.map((asset) => (
          <article
            className="rounded-lg border border-white/10 bg-slate-950/60 p-4"
            key={asset.id}
          >
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {asset.ticker}
                </h3>
                <p className="text-sm text-slate-500">Demo asset</p>
              </div>
              {asset.exposureMultiplier > 1 ? (
                <span className="rounded-full border border-amber-300/25 bg-amber-300/10 px-3 py-1 text-sm font-semibold text-amber-100">
                  槓桿
                </span>
              ) : null}
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              <label className="grid gap-2">
                <span className="text-sm font-medium text-slate-400">
                  Name
                </span>
                <input
                  className="min-h-11 rounded-lg border border-white/10 bg-slate-950 px-3 text-base text-slate-100 outline-none transition focus:border-cyan-200/60"
                  onChange={(event) =>
                    updateAsset(asset.id, 'name', event.target.value)
                  }
                  type="text"
                  value={asset.name}
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-medium text-slate-400">
                  Current Value
                </span>
                <input
                  className="min-h-11 rounded-lg border border-white/10 bg-slate-950 px-3 text-base text-slate-100 outline-none transition focus:border-cyan-200/60"
                  onChange={(event) =>
                    updateAsset(asset.id, 'currentValue', event.target.value)
                  }
                  type="number"
                  value={asset.currentValue}
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-medium text-slate-400">
                  Target Weight
                </span>
                <input
                  className="min-h-11 rounded-lg border border-white/10 bg-slate-950 px-3 text-base text-slate-100 outline-none transition focus:border-cyan-200/60"
                  onChange={(event) =>
                    updateAsset(asset.id, 'targetWeight', event.target.value)
                  }
                  step="0.01"
                  type="number"
                  value={asset.targetWeight}
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-medium text-slate-400">
                  Asset Type
                </span>
                <input
                  className="min-h-11 rounded-lg border border-white/10 bg-slate-950 px-3 text-base text-slate-100 outline-none transition focus:border-cyan-200/60"
                  onChange={(event) =>
                    updateAsset(asset.id, 'assetType', event.target.value)
                  }
                  type="text"
                  value={asset.assetType}
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-medium text-slate-400">
                  Exposure Multiplier
                </span>
                <input
                  className="min-h-11 rounded-lg border border-white/10 bg-slate-950 px-3 text-base text-slate-100 outline-none transition focus:border-cyan-200/60"
                  onChange={(event) =>
                    updateAsset(
                      asset.id,
                      'exposureMultiplier',
                      event.target.value,
                    )
                  }
                  step="0.1"
                  type="number"
                  value={asset.exposureMultiplier}
                />
              </label>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default PortfolioEditor
