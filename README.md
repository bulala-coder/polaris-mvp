# Polaris 北極星

## Current Version

v0.3.0

## Live Demo

https://polaris-mvp-theta.vercel.app

## Repository

https://github.com/bulala-coder/polaris-mvp

## Description

Polaris is a frontend-only local prototype of a long-term investment decision system.
It helps users review daily decisions, portfolio allocation, market risk context, and investment discipline.

## Product Principle

Polaris does not predict the market. It helps users make calmer, more consistent, and more explainable long-term investment decisions.

## Current Pages

- 今日決策｜Today：根據 Portfolio、Market、User Position 產生每日決策
- 投資組合｜Portfolio：可編輯資產配置、偏離與有效曝險，並儲存在 localStorage
- 市場風險｜Market：可編輯市場風險分數，並儲存在 localStorage
- 反思｜Journal：投資決策反思展示，目前仍是 mock display
- 設定｜Settings：使用者投資背景、產品邊界、資料狀態與免責聲明

## Tech Stack

- React
- Vite
- TypeScript
- Tailwind CSS
- React Router
- Vercel

## Current Status

- Frontend-only local prototype
- Mock portfolio data
- Mock market risk data
- Mock journal display
- Portfolio can be edited and saved in localStorage
- Market data can be edited and saved in localStorage
- User Position can be edited and saved in localStorage
- Today decision is generated from Portfolio, Market, and User Position
- Interface is Chinese-first with key English product terms retained
- Editable portfolio with localStorage
- Editable market data with localStorage
- User Position settings with localStorage
- Decision Engine v0.2
- Decision history data model prepared
- Decision history localStorage utilities prepared
- Traditional Chinese copy polish
- Chinese-first interface with English product terms retained
- No login
- No database
- No brokerage connection
- No financial API

## Disclaimer

Polaris does not provide financial advice, stock recommendations, short-term trading signals, market predictions, or guaranteed investment outcomes.

Polaris 不提供財務建議、個股推薦、短線交易訊號、市場預測或保證投資結果。

## Local Development

```bash
npm install
npm run dev
npm run build
```
