import HeroDecisionCard from '../components/decision/HeroDecisionCard'
import NotRecommendedBox from '../components/decision/NotRecommendedBox'
import ReasonList from '../components/decision/ReasonList'
import SnapshotCard from '../components/decision/SnapshotCard'
import AppShell from '../components/layout/AppShell'
import PageContainer from '../components/layout/PageContainer'
import { mockDailyDecision } from '../data/mockData'

const snapshotItems = [
  {
    label: 'Market Risk',
    value: 'Level 3｜中性偏高',
    helperText: '市場壓力偏高，但仍在觀察區間。',
  },
  {
    label: 'Portfolio Drift',
    value: '輕微偏離',
    helperText: '配置與原本策略有小幅差距。',
  },
  {
    label: 'Effective Exposure',
    value: '約 123%',
    helperText: '反映槓桿與低曝險資產後的整體曝險。',
  },
]

const reasons = [
  '市場風險處於中性偏高，尚未達到防守模式。',
  '投資組合有輕微偏離，可先用新資金微調。',
  '目前不需要因短期波動改變長期策略。',
]

const notRecommendedItems = [
  '不建議因單日漲跌大幅改變配置。',
  '不建議把 Polaris 當作短線買賣訊號。',
  '不建議忽略自己的現金安全水位。',
]

function TodayPage() {
  return (
    <AppShell>
      <PageContainer>
        <div className="mb-8 max-w-3xl">
          <p className="mb-4 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-100 shadow-[0_0_32px_rgba(34,211,238,0.12)]">
            Today
          </p>
          <h1 className="text-4xl font-semibold tracking-normal text-white sm:text-5xl">
            今日決策
          </h1>
          <p className="mt-5 text-xl leading-relaxed text-slate-300">
            以長期策略為核心，快速檢查今天是否需要調整行動。
          </p>
        </div>

        <HeroDecisionCard decision={mockDailyDecision} />

        <section className="mt-5">
          <h2 className="text-2xl font-semibold text-white">Snapshot</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {snapshotItems.map((item) => (
              <SnapshotCard
                helperText={item.helperText}
                key={item.label}
                label={item.label}
                value={item.value}
              />
            ))}
          </div>
        </section>

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <ReasonList reasons={reasons} />
          <NotRecommendedBox items={notRecommendedItems} />
        </div>

        <section className="mt-5 rounded-lg border border-white/10 bg-slate-950/60 p-5 text-sm leading-relaxed text-slate-400 shadow-xl shadow-black/20 backdrop-blur">
          <h2 className="text-base font-semibold text-slate-100">
            Trust Notice
          </h2>
          <p className="mt-3">
            Polaris 的輸出是根據 mock 投資組合與 mock 市場風險資料產生。
          </p>
          <p className="mt-2">
            目前版本僅供產品原型展示，不應作為真實投資操作依據。
          </p>
        </section>
      </PageContainer>
    </AppShell>
  )
}

export default TodayPage
