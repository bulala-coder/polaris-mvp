import AppShell from '../components/layout/AppShell'
import PageContainer from '../components/layout/PageContainer'
import SettingsInfoCard from '../components/settings/SettingsInfoCard'

const settingsSections = [
  {
    title: 'About Polaris',
    description: 'Polaris 的定位與使用邊界。',
    items: [
      'Polaris 是長期投資者的決策羅盤',
      '它協助你檢查投資定位、資產配置與市場風險',
      '它不是選股 App，也不是短線交易工具',
    ],
  },
  {
    title: 'Data Status',
    description: '目前 v0.1 使用的資料來源狀態。',
    items: [
      { label: 'Portfolio data', value: 'Mock data' },
      { label: 'Market data', value: 'Mock data' },
      { label: 'Journal data', value: 'Mock data' },
      { label: 'Storage', value: 'Local prototype' },
    ],
  },
  {
    title: 'Prototype Notice',
    description: '這個版本專注於前端流程與資訊架構驗證。',
    items: [
      '目前資料皆為 mock data',
      '不連接券商帳戶',
      '不讀取真實金融資料 API',
      '不提供個股推薦',
      '不提供短線買賣訊號',
      '不保證投資結果',
    ],
  },
  {
    title: 'Version',
    description: '目前產品與技術版本。',
    items: [
      'Polaris v0.1',
      'Frontend-only prototype',
      'Built with React, Vite, TypeScript, Tailwind CSS',
    ],
  },
]

function SettingsPage() {
  return (
    <AppShell>
      <PageContainer>
        <div className="mb-8 max-w-3xl">
          <p className="mb-4 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-100">
            Settings
          </p>
          <h1 className="text-4xl font-semibold tracking-normal text-white sm:text-5xl">
            Settings
          </h1>
          <p className="mt-5 text-xl leading-relaxed text-slate-300">
            管理 Polaris 的資料狀態與產品設定
          </p>
        </div>

        <div className="grid gap-5">
          {settingsSections.map((section) => (
            <SettingsInfoCard
              description={section.description}
              items={section.items}
              key={section.title}
              title={section.title}
            />
          ))}
        </div>
      </PageContainer>
    </AppShell>
  )
}

export default SettingsPage
