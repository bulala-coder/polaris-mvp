import type { MarketCategoryScore } from '../../types/market'

type CategoryScoreListProps = {
  categoryScores: MarketCategoryScore[]
}

function CategoryScoreList({ categoryScores }: CategoryScoreListProps) {
  return (
    <section className="rounded-lg border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-black/20 backdrop-blur">
      <h2 className="text-2xl font-semibold text-white">
        分項分數｜Category Scores
      </h2>

      <div className="mt-5 grid gap-4">
        {categoryScores.map((category) => (
          <article
            className="rounded-lg border border-white/10 bg-white/[0.04] p-4"
            key={category.key}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-base font-semibold text-white">
                  {category.label}
                </h3>
                <p className="mt-1 text-sm text-slate-400">
                  {category.description}
                </p>
              </div>
              <p className="text-lg font-semibold text-cyan-100">
                {category.score}
              </p>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-cyan-300/80"
                style={{ width: `${category.score}%` }}
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default CategoryScoreList
