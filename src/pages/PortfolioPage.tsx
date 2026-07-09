import AppShell from '../components/layout/AppShell'
import PageContainer from '../components/layout/PageContainer'

function PortfolioPage() {
  return (
    <AppShell>
      <PageContainer>
        <div className="max-w-3xl rounded-lg border border-white/10 bg-white/[0.07] p-6 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl sm:p-8">
          <p className="mb-4 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-100">
            Portfolio
          </p>
          <h1 className="text-4xl font-semibold tracking-normal text-white sm:text-5xl">
            投資組合
          </h1>
          <p className="mt-5 text-xl leading-relaxed text-slate-300">
            投資組合狀態將在這裡顯示
          </p>
        </div>
      </PageContainer>
    </AppShell>
  )
}

export default PortfolioPage
