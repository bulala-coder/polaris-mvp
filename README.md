# Polaris 北極星

## Current Version

v0.3.3

## Live Demo

https://polaris-mvp-theta.vercel.app

## Repository

https://github.com/bulala-coder/polaris-mvp

## Description

Polaris is a frontend-only local prototype of a long-term investment decision system.
Polaris is a simplified local prototype that focuses on two questions:

- What is the current market risk?
- How far am I from my asset goal?

## Product Principle

Polaris does not predict the market. It helps users make calmer, more consistent, and more explainable long-term investment decisions.

## Current Pages

- 首頁：市場風險、資產目標進度、今日提醒
- 目標：設定目前資產、目標資產、每月投入
- 設定：產品邊界、資料狀態、免責聲明

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
- Simplified three-page main experience
- Home dashboard for market risk and asset goal progress
- Goal settings saved in localStorage
- Goal ETA estimate
- Suggested exposure based on market risk and max exposure
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
- Save Today decision to localStorage
- Decision history entries include Portfolio, Market, and User Position snapshots
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
