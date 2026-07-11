# Polaris v0.3 Blueprint

## 1. Version Goal

Polaris v0.3 要從 usable local prototype，升級為 decision tracking prototype。

v0.2 已經可以編輯 Portfolio、Market、User Position，並根據三者產生 Today decision。

v0.3 要加入決策歷史、反思儲存、視覺化與匯出能力，讓使用者能追蹤自己的投資紀律。

## 2. Product Principle

- Polaris does not predict the market.
- Polaris does not provide stock recommendations.
- Polaris does not provide short-term trading signals.
- Polaris helps long-term investors make calmer, more consistent, and more explainable decisions.
- Life comes before market.
- Decision matters more than prediction.
- Reflection improves discipline.

## 3. v0.3 Scope

### Decision History

- 使用者可以儲存當天 Today decision
- 每筆紀錄包含日期、decision label、risk level、summary、reasons、recommended actions、not recommended actions
- 儲存在 localStorage
- 可在 Journal 或新的 History 區塊查看

### Real Journal Persistence

- Journal 不再只是 mock display
- 使用者可以新增反思紀錄
- 每筆紀錄包含日期、情緒、是否遵守策略、note
- 儲存在 localStorage
- 可 reset demo journal data

### Charts and Visualization

- Portfolio allocation chart
- Effective exposure indicator
- Market risk score visual bar
- Risk category score bars
- 先用簡單 CSS / HTML 視覺化，不一定需要 chart library

### Import / Export Local Data

- 匯出 localStorage 中的 Polaris data 為 JSON
- 匯入 JSON 回復資料
- 資料包含 Portfolio、Market、User Position、Journal、Decision History
- 目的：避免資料只存在單一瀏覽器而無法備份

### Better Decision Explanation

- Today 頁新增「為什麼 Polaris 得出這個結論」
- 將 decision priority 顯示給使用者
- 顯示哪些條件被觸發、哪些條件未觸發
- 語氣保持冷靜、可解釋、非預測

## 4. Out of Scope

- No login
- No Supabase
- No backend
- No real brokerage connection
- No real financial API
- No AI chat
- No stock recommendation
- No short-term trading signal
- No market prediction
- No paid plan
- No mobile app store release

## 5. Data Model Draft

```ts
interface DecisionHistoryEntry {
  id: string
  createdAt: string
  decisionLabel: string
  riskLevel: number
  summary: string
  reasons: string[]
  recommendedActions: string[]
  notRecommendedActions: string[]
  portfolioSnapshot: unknown
  marketSnapshot: unknown
  userPositionSnapshot: unknown
}

interface JournalEntry {
  id: string
  date: string
  emotion: string
  followedStrategy: boolean
  note: string
  linkedDecisionId?: string
}

interface PolarisLocalDataExport {
  version: string
  exportedAt: string
  portfolioAssets: unknown[]
  marketInput: unknown
  userPosition: unknown
  journalEntries: JournalEntry[]
  decisionHistoryEntries: DecisionHistoryEntry[]
}

interface DecisionExplanation {
  priorityChecks: PriorityCheck[]
  triggeredCheck: PriorityCheck | null
  skippedChecks: PriorityCheck[]
  explanationSummary: string
}

interface PriorityCheck {
  id: string
  label: string
  status: 'triggered' | 'passed' | 'not_applicable'
  explanation: string
}
```

## 6. Suggested Implementation Plan

### v0.3.0 Decision History Data Model

- 新增 decision history types
- 新增 storage keys
- 新增 decision history utilities
- 不改 UI 或只做很小幅 UI

### v0.3.1 Save Today Decision

- Today 頁新增「儲存今日決策」
- 儲存 decision output 與當下 snapshots 到 localStorage
- 避免同一天重複儲存時造成混亂，可先允許多筆

### v0.3.2 Journal Persistence

- Journal 頁加入新增反思紀錄
- Journal entries 儲存 localStorage
- Reset demo journal data

### v0.3.3 Decision History View

- Journal 頁或 Today 頁新增 history list
- 顯示過去 decisions
- 可查看簡要內容

### v0.3.4 Charts and Visualization

- Portfolio allocation visual
- Market risk score bar
- Category score bars
- Effective exposure indicator

### v0.3.5 Import / Export Local Data

- Settings 頁加入 export JSON
- Settings 頁加入 import JSON
- 加入安全提示，不保證資料格式完整

### v0.3.6 Better Decision Explanation

- Decision Engine 回傳 explanation
- Today 頁顯示觸發條件與未觸發條件

### v0.3.7 Release Polish

- README 更新
- CHANGELOG 更新
- RELEASE_SUMMARY_v0.3.md

## 7. Acceptance Criteria

- 使用者可以儲存 Today decision
- 使用者可以查看 decision history
- 使用者可以新增 Journal reflection
- Journal 資料刷新後仍保留
- 使用者可以 reset journal demo data
- Portfolio / Market 至少有基本視覺化
- 使用者可以 export local data
- 使用者可以 import local data
- Today decision explanation 更透明
- 沒有真實金融 API
- 沒有個股推薦
- 沒有短線交易訊號
- npm run build 成功
- Vercel 部署成功

## 8. Safety Notes

- Polaris v0.3 仍是 prototype
- 所有資料仍在本機瀏覽器
- 匯入/匯出資料由使用者自行保存
- 不應作為真實投資操作唯一依據
- 所有輸出都應保持可解釋、冷靜、非預測、非保證
