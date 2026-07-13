import AppShell from '../components/layout/AppShell'
import PageContainer from '../components/layout/PageContainer'
import SettingsInfoCard from '../components/settings/SettingsInfoCard'
import SettingsSectionCard from '../components/settings/SettingsSectionCard'
import SettingsStatusGrid from '../components/settings/SettingsStatusGrid'

const whatPolarisIs = [
  '用簡單方式看懂目前市場風險',
  '協助使用者確認距離資產目標還有多遠',
  '重點是讓長期投入更清楚、更安定、更可持續',
]

const whatPolarisIsNot = [
  '不是選股 App',
  '不是短線交易工具',
  '不是市場預測工具',
  '不是保證獲利系統',
  '不是取代專業財務顧問的服務',
]

const dataStatusItems = [
  { label: '市場資料｜Market data', value: 'Local prototype data' },
  { label: '資產目標｜Goal settings', value: 'Saved in localStorage' },
  { label: '儲存狀態｜Storage', value: 'Frontend-only local prototype' },
  { label: '券商連線｜Brokerage connection', value: 'Not connected' },
  { label: '金融資料 API｜Financial API', value: 'Not connected' },
]

const prototypeLimitItems = [
  'v0.3.8 聚焦簡化市場風險、資產目標距離、預期達標時間、10 年估算與清楚的曝險判讀',
  '尚未支援帳號登入',
  '尚未支援後端資料庫',
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
            設定｜Settings
          </p>
          <h1 className="text-4xl font-semibold tracking-normal text-white sm:text-5xl">
            設定｜Settings
          </h1>
          <p className="mt-5 text-xl leading-relaxed text-slate-300">
            查看 Polaris 的產品邊界、資料狀態與版本資訊。
          </p>
          <p className="mt-4 text-base leading-relaxed text-slate-400">
            Settings 用來說明 Polaris
            的產品定位、資料狀態、版本限制與使用邊界。v0.3.8
            改為更簡化的本機原型，聚焦市場風險與資產目標距離。
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
              'Polaris v0.3.8',
              'Simplified local prototype',
              'React + Vite + TypeScript + Tailwind CSS',
              'Deployment：Vercel',
              'Repository：GitHub',
            ]}
            title="版本資訊｜Version"
          />
        </div>
      </PageContainer>
    </AppShell>
  )
}

export default SettingsPage
