# Changelog

## v0.4.0 - Holdings-Based Expected Return
- Added holdings input on Settings page
- Added local rule-based holding assumption assistant
- Calculated expected annual return from individual holdings
- Calculated current exposure from holding exposure multipliers
- Used holdings as the preferred source of truth, with allocation fallback
- Kept return assumptions editable and clearly labeled as assumptions, not forecasts

## v0.3.9 - Navigation Simplification
- Simplified main navigation to Home and Settings
- Renamed Goal page to Settings while keeping the /goal route
- Removed the old standalone Settings page from the main app
- Moved product boundary and disclaimer copy into the Settings page
- Redirected old /settings route to /goal to avoid 404 after navigation simplification
- Unified Home page calculations around Settings data as the single source of truth
- Fixed current total asset mismatch in expected return display
- Fixed current exposure calculation using stock and leveraged stock allocation
- Used normalized allocation for expected return and ETA calculations

## v0.3.9 - Improve Allocation Inputs
- Improved asset allocation inputs to support decimals
- Added quick allocation presets on Goal page
- Kept allocation values stored as normalized decimal weights
- Preserved portfolio expected return and ETA calculations

## v0.3.8 - Portfolio Expected Return
- Replaced 10-year asset projection with portfolio expected annual return
- Added asset allocation inputs for stock, leveraged stock, bond, and cash
- Calculated expected annual return from allocation and built-in long-term assumptions
- Used portfolio expected return for goal ETA estimation
- Kept the product focused on market risk, asset goal distance, expected return, and exposure guidance

## v0.3.7 - Buffett-Munger Inspired Copy Tone
- Updated Home page copy with a calmer, wiser, and more memorable long-term investing tone
- Made market risk, ETA, and exposure guidance more human-friendly
- Added lightly witty guidance without market prediction, stock recommendations, or trading signals
- Kept Settings and disclaimer language professional

## v0.3.6 - Friendly Copy Tone
- Updated Home page copy with a calmer and lightly humorous tone
- Made market risk descriptions more human-friendly
- Improved Goal page helper text
- Kept investment disclaimer and safety boundaries professional

## v0.3.5 - Market Risk Simplification
- Simplified Home market risk display to Low / Medium / High
- Hid detailed market risk score and Level 1–5 from the Home page
- Kept internal market risk calculation for suggested exposure
- Updated daily reminder wording based on simplified market risk state

## v0.3.4 - Goal Return Rate and Exposure Clarity
- Added expected annual return setting to Goal page
- Updated goal ETA calculation to use monthly contribution and expected annual return
- Added current portfolio exposure to Home page
- Clarified Exposure Guide with current exposure, max exposure, and suggested exposure
- Improved exposure guidance wording to avoid prediction or trading-signal language

## v0.3.3 - Goal ETA and Suggested Exposure
- Added estimated time to asset goal
- Added max exposure setting to Goal page
- Added suggested exposure based on market risk level and max exposure
- Updated Home page to show market risk, goal progress, ETA, and suggested exposure

## v0.3.2 - Simplify Core Experience
- Simplified visible navigation to three main pages
- Re-centered product around market risk and asset goal progress
- Added Goal page for current net worth, target net worth, and monthly contribution
- Updated Home page to show market risk, goal progress, and simple daily reminder
- Reduced emphasis on Journal and Decision History in the main experience

## v0.3.1 - Save Today Decision
- Added Save Today Decision action
- Saved decision output to localStorage
- Stored Portfolio, Market, and User Position snapshots with each decision entry
- Displayed saved decision count on Today page

## v0.3.0 - Decision History Data Model
- Added decision history types
- Added decision history localStorage key
- Added decision history storage utilities
- Prepared foundation for saving Today decisions in v0.3.1

## v0.2.7 - Release Polish
- Updated README for v0.2 local prototype scope
- Added v0.2 release summary
- Updated Settings version display
- Confirmed v0.2 includes editable Portfolio, editable Market, User Position, localStorage, and Decision Engine
- Confirmed Chinese-first interface copy

## v0.2.6 - Chinese Copy Polish
- Updated core interface copy to Traditional Chinese
- Changed Today decision output to Chinese-first wording
- Localized Portfolio, Market, Settings, and navigation labels
- Retained key English product terms for clarity

## v0.2.5 - Decision Engine v0.2
- Added user risk capacity calculation
- Added local prototype decision engine
- Updated Today page to generate decisions from Portfolio, Market, and User Position
- Added recommended actions to Today decision output

## v0.2.4 - User Position Settings
- Added User Position settings to Settings page
- Added localStorage persistence for User Position
- Added reset demo user position action
- Prepared life-context data for future decision engine

## v0.1.7 - Release Polish
- Updated README for v0.1 release clarity
- Added changelog
- Added release summary
- Confirmed Polaris v0.1 MVP scope

## v0.1.6 - Settings Page Polish
- Improved product boundaries, data status, prototype limitations, and investment disclaimer

## v0.1.5 - Journal Page Polish
- Improved journal reflection page with discipline insights and usage limits

## v0.1.4 - Market Page Polish
- Improved market risk dashboard with interpretation and usage limits

## v0.1.3 - Portfolio Page Polish
- Improved portfolio dashboard with allocation insights and rebalancing reminders

## v0.1.2 - Today Page Polish
- Improved daily decision dashboard with snapshots, reasons, and not-recommended actions

## v0.1.1 - Trust & Disclaimer
- Added prototype notices and investment disclaimer content

## v0.1.0 - Initial Online MVP
- Built initial frontend-only prototype
- Added main app routes
- Added Today, Portfolio, Market, Journal, and Settings pages
- Deployed to Vercel
