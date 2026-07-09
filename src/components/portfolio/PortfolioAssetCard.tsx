import type { PortfolioAsset } from '../../types/portfolio'

type PortfolioAssetCardProps = {
  asset: PortfolioAsset
}

const currencyFormatter = new Intl.NumberFormat('zh-TW', {
  style: 'currency',
  currency: 'TWD',
  maximumFractionDigits: 0,
})

const percentFormatter = new Intl.NumberFormat('zh-TW', {
  style: 'percent',
  maximumFractionDigits: 1,
})

function formatDrift(drift: number) {
  if (drift === 0) {
    return '0%'
  }

  return `${drift > 0 ? '+' : ''}${percentFormatter.format(drift)}`
}

function PortfolioAssetCard({ asset }: PortfolioAssetCardProps) {
  const details = [
    {
      label: '目前市值',
      value: currencyFormatter.format(asset.currentValue),
    },
    {
      label: '目前比例',
      value: percentFormatter.format(asset.currentWeight),
    },
    {
      label: '目標比例',
      value: percentFormatter.format(asset.targetWeight),
    },
    {
      label: '偏離',
      value: formatDrift(asset.drift),
    },
    {
      label: '曝險倍數',
      value: `${asset.exposureMultiplier}x`,
    },
  ]

  return (
    <article className="rounded-lg border border-white/10 bg-slate-950/60 p-5 shadow-xl shadow-black/20 backdrop-blur">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-white">{asset.name}</h2>
          <p className="mt-1 text-sm font-medium text-slate-400">
            {asset.ticker}
          </p>
        </div>
        {asset.exposureMultiplier > 1 ? (
          <span className="rounded-full border border-amber-300/25 bg-amber-300/10 px-3 py-1 text-sm font-semibold text-amber-100">
            槓桿
          </span>
        ) : null}
      </div>

      <dl className="mt-5 grid gap-3 sm:grid-cols-5">
        {details.map((detail) => (
          <div key={detail.label}>
            <dt className="text-xs font-medium text-slate-500">
              {detail.label}
            </dt>
            <dd className="mt-1 text-sm font-semibold text-slate-100">
              {detail.value}
            </dd>
          </div>
        ))}
      </dl>
    </article>
  )
}

export default PortfolioAssetCard
