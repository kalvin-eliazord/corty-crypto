# 📊 Crypto Portfolio Tracker

A full-stack cryptocurrency portfolio tracker built with **Next.js**, **React 18**, **Redux Toolkit**, and **React Query**.  
Track your crypto holdings with historical purchase dates, live prices from CoinGecko, and performance metrics — with full offline persistence and a responsive dark-mode UI.

---

## 🚀 Features

- 💰 Add assets with specific **purchase date** and **amount**
- 📈 Fetch **real-time prices** and **market data** from the **CoinGecko API**
- 📊 Track **portfolio value**, **cost basis**, **profit/loss**, and **percentage changes**
- 💾 Persist data and cache with **localStorage**
- 🌗 Responsive UI with **dark mode** via TailwindCSS
- 🧩 Modular, reusable components with Radix UI primitives
- ✅ Input validation for amount/date + decimal support
- ⚠️ Retry logic and countdown alerts for API/network errors
- 🌍 Multi-currency support (USD, EUR, etc.) with dynamic switching

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 15.3.1, React 18
- **State Management**: Redux Toolkit (currency), useState + localStorage (portfolio)
- **Data Fetching**: React Query v5 (with cache persistence)
- **Styling**: TailwindCSS 4 (darkMode: `"class"`)
- **API**: CoinGecko via Axios
- **Components**: Radix UI, Lucide Icons, SVG assets
- **Utilities**: `date-fns`, `Intl.NumberFormat`, React hooks
  
---

## Installation

1. Clone the repository  
   ```bash
   git clone https://github.com/your-username/crypto-portfolio-tracker.git
   cd crypto-portfolio-tracker

2. Install dependencies 
   ```bash
   npm install
    # or
    yarn install

3. Run the development server 
   ```bash
   npm run dev
    # or
    yarn dev

4. Open http://localhost:3000 in your browser.
      
## 🧠 Core Concepts

### 📂 Portfolio Management

- Assets are stored as objects with `id`, `amount`, and `date`.
- Multiple purchases per coin are supported, each with a distinct date.
- Aggregation logic computes:
  - Total amount per coin
  - Historical total cost (based on price at time of purchase)
  - Real-time market value (based on current price)

---

### 🔄 Data Fetching & Caching

- All data is fetched using **React Query v5**
- Queries use `staleTime: Infinity` to disable background refetching for stability
- Cache is persisted using `@tanstack/query-persist-client` + `localStorage`
- On app load, React Query state is automatically rehydrated from `window.__REACT_QUERY_STATE__`
- Queries are fully typed with TypeScript generics
- Conditionally enabled based on data availability to avoid errors

---

### 💱 Currency State (Global)

- Currency state is globally managed via Redux (`currencySlice`)
- Stores the symbol (e.g. `$`) and code (e.g. `usd`)
- Used for:
  - Dynamic API requests (e.g. `/coins/bitcoin?vs_currency=eur`)
  - All formatted values (price, change %, cost basis)

---

## 🧩 Key Components

| Component              | Description                                               |
|------------------------|-----------------------------------------------------------|
| `Portfolio.tsx`        | Main dashboard with asset list, charts, and dialogs       |
| `CurrencySelector.tsx` | Dropdown to choose base currency (USD, EUR, etc.)         |
| `SearchCoins.tsx`      | Autocomplete coin search input                            |
| `OneHourPercentage.tsx`| Shows 1h price change with color and directional arrow    |
| `AssetInfo.tsx`        | Displays current price and subtitle                       |
| `AssetPercentage.tsx`  | Shows percentage change (24h/7d) with colored text        |
| `AlertError.tsx`       | Displays retry-able network error with countdown timer    |

---

## 🧮 Utilities

- `formatAmountUnit(amount)`
  - Formats large numbers with suffixes (`k`, `mln`, `bln`)

- `handleKeyDown(e)`
  - Prevents non-numeric input except for navigation, minus, dot

- `isDotAtTheEnd(amountInput, e)`
  - Handles edge case where decimal point is trailing

- `formatAsset(pricesPerDate)`
  - Aggregates all portfolio entries by coin ID
  - Returns normalized per-coin data including total cost and amount

---

## ❗ Error Handling

- All network or API errors are routed through `AlertError.tsx`
- Displayed as toast-style alerts (bottom right corner)
- Errors include a 60-second retry countdown
- Retry re-triggers the failed query automatically

---

## 🎨 Styling

- Uses TailwindCSS 4.1 with `"darkMode": "class"` strategy
- Custom theme extension:
  - `muted` color: `#e5e7eb`
- Responsive utility-first components (mobile/tablet/desktop)

---

## 🌍 Future Improvements

- 📤 Portfolio export/import (CSV/JSON)
- 📉 Add Recharts for historical performance graphs
- 💱 Multi-currency portfolios (e.g. track in BTC, view in USD)
- 👤 Add authentication for syncing portfolios across devices
- 📊 Support staking/yield-bearing assets (APY, rewards, etc.)

---

## License

MIT © Corty
