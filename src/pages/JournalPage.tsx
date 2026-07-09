import AppShell from '../components/layout/AppShell'
import PageContainer from '../components/layout/PageContainer'
import ReflectionEntryCard from '../components/reflection/ReflectionEntryCard'
import ReflectionPromptCard from '../components/reflection/ReflectionPromptCard'
import JournalInsightCard from '../components/reflection/JournalInsightCard'
import JournalNoteBox from '../components/reflection/JournalNoteBox'
import { mockReflectionEntries } from '../data/mockData'

const insightItems = [
  {
    label: 'Strategy Discipline',
    value: '已遵守策略',
    helperText: '最近紀錄顯示行動仍貼近原本計畫。',
  },
  {
    label: 'Emotional State',
    value: '冷靜 / 有些焦慮',
    helperText: '情緒可以被記錄，不需要立刻轉成操作。',
  },
  {
    label: 'Review Focus',
    value: '避免短期波動干擾',
    helperText: '把注意力放回長期策略與紀律。',
  },
]

const reflectionFocusItems = [
  '今天的操作是否來自原本計畫，而不是市場雜訊？',
  '是否因為恐懼、貪婪或後悔而想要改變配置？',
  '如果沒有重大偏離，是否可以用等待與紀律取代頻繁操作？',
]

const usageLimitItems = [
  'Journal 目前是 mock display，尚未儲存真實紀錄。',
  'Journal 不是績效排名工具。',
  'Journal 的目的不是要求每次都做對，而是幫助使用者逐步降低衝動決策。',
]

function JournalPage() {
  return (
    <AppShell>
      <PageContainer>
        <div className="mb-8 max-w-3xl">
          <p className="mb-4 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-100">
            Journal
          </p>
          <h1 className="text-4xl font-semibold tracking-normal text-white sm:text-5xl">
            Journal
          </h1>
          <p className="mt-5 text-xl leading-relaxed text-slate-300">
            記錄你是否依照長期策略行動
          </p>
          <p className="mt-4 text-base leading-relaxed text-slate-400">
            Journal
            用來記錄每次投資決策背後的情緒、理由與紀律，幫助你檢查自己是否仍遵守長期策略。
          </p>
        </div>

        <div className="grid gap-5">
          <ReflectionPromptCard />

          <section className="grid gap-4 md:grid-cols-3">
            {insightItems.map((item) => (
              <JournalInsightCard
                helperText={item.helperText}
                key={item.label}
                label={item.label}
                value={item.value}
              />
            ))}
          </section>

          <div className="grid gap-5 lg:grid-cols-2">
            <JournalNoteBox title="反思重點" items={reflectionFocusItems} />
            <JournalNoteBox title="Journal 使用限制" items={usageLimitItems} />
          </div>

          <section>
            <h2 className="text-2xl font-semibold text-white">
              最近回顧紀錄
            </h2>
            <div className="mt-5 grid gap-4">
              {mockReflectionEntries.map((entry) => (
                <ReflectionEntryCard entry={entry} key={entry.date} />
              ))}
            </div>
          </section>
        </div>
      </PageContainer>
    </AppShell>
  )
}

export default JournalPage
