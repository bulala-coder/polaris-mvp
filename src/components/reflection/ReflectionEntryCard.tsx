import type {
  ReflectionEmotion,
  ReflectionEntry,
} from '../../types/reflection'

type ReflectionEntryCardProps = {
  entry: ReflectionEntry
}

const emotionLabels: Record<ReflectionEmotion, string> = {
  calm: '冷靜',
  anxious: '焦慮',
  afraid: '害怕',
  greedy: '貪婪',
  regretful: '後悔',
  hesitant: '猶豫',
  relieved: '放心',
  impulsive: '衝動',
}

function ReflectionEntryCard({ entry }: ReflectionEntryCardProps) {
  const details = [
    {
      label: '決策',
      value: entry.decisionLabel,
    },
    {
      label: '情緒',
      value: emotionLabels[entry.emotion],
    },
    {
      label: '是否遵守策略',
      value: entry.followedStrategy ? '是' : '否',
    },
  ]

  return (
    <article className="rounded-lg border border-white/10 bg-slate-950/60 p-5 shadow-xl shadow-black/20 backdrop-blur">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-400">日期</p>
          <h3 className="mt-1 text-xl font-semibold text-white">
            {entry.date}
          </h3>
        </div>
        <span className="rounded-full border border-cyan-200/20 bg-cyan-200/10 px-3 py-1 text-sm font-semibold text-cyan-100">
          {emotionLabels[entry.emotion]}
        </span>
      </div>

      <dl className="mt-5 grid gap-3 sm:grid-cols-3">
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

      <p className="mt-5 border-t border-white/10 pt-4 text-base leading-relaxed text-slate-300">
        {entry.note}
      </p>
    </article>
  )
}

export default ReflectionEntryCard
