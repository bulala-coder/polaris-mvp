import AppShell from '../components/layout/AppShell'
import PageContainer from '../components/layout/PageContainer'
import SettingsInfoCard from '../components/settings/SettingsInfoCard'
import SettingsSectionCard from '../components/settings/SettingsSectionCard'
import SettingsStatusGrid from '../components/settings/SettingsStatusGrid'

const whatPolarisIs = [
  '長期投資者的決策羅盤',
  '協助使用者檢查投資定位、資產配置、市場風險與決策紀律',
  '重點是幫助使用者做出一致、可解釋、符合長期策略的決策',
]

const whatPolarisIsNot = [
  '不是選股 App',
  '不是短線交易工具',
  '不是市場預測工具',
  '不是保證獲利系統',
  '不是取代專業財務顧問的服務',
]

const dataStatusItems = [
  { label: 'Portfolio data', value: 'Mock data' },
  { label: 'Market data', value: 'Mock data' },
  { label: 'Journal data', value: 'Mock display' },
  { label: 'Storage', value: 'Frontend-only prototype' },
  { label: 'Brokerage connection', value: 'Not connected' },
  { label: 'Financial API', value: 'Not connected' },
]

const prototypeLimitItems = [
  'v0.1.6 目前只展示產品流程與 UI',
  '尚未支援真實資料輸入',
  '尚未支援帳號登入',
  '尚未支援資料儲存',
  '尚未支援自動更新市場資料',
]

const disclaimerItems = [
  'Polaris 不提供財務建議',
  'Polaris 不提供個股推薦',
  'Polaris 不提供短線買賣訊號',
  'Polaris 不保證任何投資結果',
  '任何投資決策都應由使用者自行判斷，必要時諮詢合格專業人士',
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
          <p className="mt-4 text-base leading-relaxed text-slate-400">
            Settings
            用來說明 Polaris 的產品定位、資料狀態、版本限制與使用邊界。
          </p>
        </div>

        <div className="grid gap-5">
          <SettingsSectionCard title="Polaris 是什麼" items={whatPolarisIs} />
          <SettingsSectionCard
            title="Polaris 不是什麼"
            items={whatPolarisIsNot}
          />
          <SettingsStatusGrid items={dataStatusItems} />
          <SettingsSectionCard
            title="原型版本限制"
            items={prototypeLimitItems}
          />
          <SettingsSectionCard
            title="投資免責聲明"
            items={disclaimerItems}
          />
          <SettingsInfoCard
            description="目前產品與技術版本。"
            items={[
              'Polaris v0.1.6',
              'Frontend-only prototype',
              'React + Vite + TypeScript + Tailwind CSS',
              'Deployment：Vercel',
              'Repository：GitHub',
            ]}
            title="Version"
          />
        </div>
      </PageContainer>
    </AppShell>
  )
}

export default SettingsPage
