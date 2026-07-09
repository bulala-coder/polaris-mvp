import AppShell from '../components/layout/AppShell'
import PageContainer from '../components/layout/PageContainer'
import ReflectionEntryCard from '../components/reflection/ReflectionEntryCard'
import ReflectionPromptCard from '../components/reflection/ReflectionPromptCard'
import { mockReflectionEntries } from '../data/mockData'

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
        </div>

        <div className="grid gap-5">
          <ReflectionPromptCard />

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
