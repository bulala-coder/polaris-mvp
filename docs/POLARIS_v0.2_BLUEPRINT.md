# Polaris v0.2 Blueprint

## 1. Version Goal

Polaris v0.2 要從 frontend-only display prototype，升級為 usable local prototype。

使用者可以手動修改資料、儲存在瀏覽器，並讓 Today 頁根據 Portfolio、Market、User Position 重新產生決策。

## 2. Product Principle

- Polaris does not predict the market.
- Polaris does not provide stock recommendations.
- Polaris does not provide short-term trading signals.
- Polaris helps long-term investors make calmer, more consistent, and more explainable decisions.
- Life comes before market.
- Decision matters more than prediction.

## 3. v0.2 Scope

### Editable Portfolio

- 使用者可修改資產名稱、目前市值、目標比例、資產類型、曝險倍數
- 用於計算總資產、目前比例、偏離程度、有效曝險

### Editable Market Data

- 使用者可手動調整估值、動能、波動、利率、景氣、信用、情緒分數
- 暫時不串真實金融 API

### Local Storage

- 使用瀏覽器 localStorage 儲存 Portfolio、Market、User Position、Journal mock entries
- 不需要登入
- 不需要資料庫

### User Position Settings

- 年齡
- 投資期限
- 每月投入
- 現金安全月數
- 最大可接受回撤
- 是否使用槓桿

### Decision Engine v0.2

- 根據 Market Risk、Portfolio Drift、Effective Exposure、Cash Ratio、User Position 產生 Today decision
- 輸出：decision label、risk level、reasons、recommended actions、not recommended actions、trust notice

## 4. Out of Scope

- No login
- No Supabase
- No backend
- No real brokerage connection
- No real financial API
- No AI chat
- No stock recommendation
- No short-term trading signal
- No paid plan
- No mobile app store release

## 5. Data Model Draft

```ts
interface PortfolioAsset {
  id: string
  name: string
  assetType: string
  currentValue: number
  targetWeight: number
  exposureMultiplier: number
}

interface Portfolio {
  assets: PortfolioAsset[]
  totalValue: number
  effectiveExposure: number
  totalDrift: number
  cashRatio: number
}

interface MarketInput {
  valuationScore: number
  momentumScore: number
  volatilityScore: number
  interestRateScore: number
  businessCycleScore: number
  creditRiskScore: number
  sentimentScore: number
  dataConfidenceLevel: 'low' | 'medium' | 'high'
}

interface UserPosition {
  age: number
  investmentHorizonYears: number
  monthlyContribution: number
  cashReserveMonths: number
  maxAcceptableDrawdown: number
  usesLeverage: boolean
}

interface DecisionOutput {
  decisionLabel: string
  riskLevel: number
  summary: string
  reasons: string[]
  recommendedActions: string[]
  notRecommendedActions: string[]
  trustNotice: string
}
```

## 6. Decision Engine Draft

v0.2 的決策邏輯應保持簡單、透明、可解釋。

- `calculateMarketRiskScore()`
  - 接收七大市場分數
  - 使用固定權重計算總分
  - 回傳 0 到 100 的市場風險分數

- `calculateMarketRiskLevel()`
  - 根據市場風險分數轉換為 Level 1 到 Level 5
  - 回傳 level 與中文 label
  - 不輸出市場漲跌預測

- `calculatePortfolioMetrics()`
  - 根據資產目前市值計算總資產
  - 計算目前比例、偏離程度、總偏離
  - 計算有效曝險與現金比例

- `calculateUserRiskCapacity()`
  - 根據投資期限、現金安全月數、最大可接受回撤、是否使用槓桿判斷風險承受條件
  - 回傳簡單的 capacity level 或 warning flags

- `generateTodayDecision()`
  - 整合 Market Risk、Portfolio Drift、Effective Exposure、Cash Ratio、User Position
  - 輸出 decision label、risk level、summary、reasons、recommended actions、not recommended actions、trust notice
  - 所有文字都要保持冷靜、非預測、非保證

決策優先順序：

1. Cash safety
2. Leverage risk
3. User risk capacity mismatch
4. Extreme market risk
5. Portfolio drift
6. Normal maintain strategy

## 7. Suggested Implementation Plan

### v0.2.0 Data Model Cleanup

- 整理 types
- 整理 calculation utilities
- 保持 UI 不大改

### v0.2.1 Editable Portfolio

- Portfolio 編輯表單
- 更新 mock data 為 state
- 暫時不儲存

### v0.2.2 Editable Market

- Market 分數編輯
- 重新計算市場風險

### v0.2.3 Local Storage

- 儲存 Portfolio、Market、User Position
- 加入 reset to demo data

### v0.2.4 User Position Settings

- Settings 加入 User Position 表單
- 影響 Today decision

### v0.2.5 Decision Engine v0.2

- Today 改為根據資料產生
- 顯示 reasons、actions、not recommended

### v0.2.6 Release Polish

- README 更新
- CHANGELOG 更新
- v0.2 release summary

## 8. Acceptance Criteria

- 使用者可修改 Portfolio
- 使用者可修改 Market scores
- 使用者可設定 User Position
- 資料刷新後仍保留
- 使用者可 reset demo data
- Today decision 會根據資料變化
- 沒有真實金融 API
- 沒有個股推薦
- npm run build 成功
- Vercel 部署成功

## 9. Safety Notes

- Polaris v0.2 仍是 prototype
- 不應作為真實投資操作依據
- 所有輸出都應保持可解釋、冷靜、非預測、非保證
