import type { Portfolio } from '../../types/portfolio'

type PortfolioSummaryCardProps = {
  portfolio: Portfolio
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

function PortfolioSummaryCard({ portfolio }: PortfolioSummaryCardProps) {
  const summaryItems = [
    {
      label: '總資產',
      value: currencyFormatter.format(portfolio.totalValue),
    },
    {
      label: '配置偏離',
      value: percentFormatter.format(portfolio.totalDrift),
    },
    {
      label: '實際曝險',
      value: percentFormatter.format(portfolio.effectiveExposure),
    },
    {
      label: '現金比例',
      value: percentFormatter.format(portfolio.cashRatio),
    },
  ]

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {summaryItems.map((item) => (
        <article
          className="rounded-lg border border-white/10 bg-white/[0.07] p-5 shadow-xl shadow-cyan-950/20 backdrop-blur-xl"
          key={item.label}
        >
          <p className="text-sm font-medium text-slate-400">{item.label}</p>
          <p className="mt-3 text-2xl font-semibold text-white">
            {item.value}
          </p>
        </article>
      ))}
    </section>
  )
}

export default PortfolioSummaryCard
