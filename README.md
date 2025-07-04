# Crypto Portfolio Tracker

A full-stack cryptocurrency portfolio tracker built with Next.js, React 18, Redux Toolkit, and React Query.  
Track your crypto holdings with historical purchase dates, live prices from CoinGecko, and performance metrics.

---

## Features

- Add assets with specific purchase date and amount  
- Fetch real-time coin prices and market data via CoinGecko API  
- Track portfolio value, profit/loss, and percentage changes  
- Persist portfolio data and React Query cache using localStorage  
- Responsive UI with dark mode support via TailwindCSS  
- Modular, reusable components with Radix UI primitives  
- Input validation and UX enhancements for amounts and date picking  
- Robust error handling with retry and countdown alerts

---

## Tech Stack

- **Frontend:** Next.js 15.3.1, React 18  
- **State Management:** Redux Toolkit for global currency, React state for portfolio + `useLocalStorage`  
- **Data Fetching:** React Query v5 with persistence and hydration  
- **Styling:** TailwindCSS (dark mode enabled)  
- **API:** CoinGecko public API via Axios client  
- **UI Components:** Radix UI, Lucide Icons, custom components  
- **Utilities:** date-fns for date formatting, Intl.NumberFormat for number localization  

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
      
## Core Concepts

### Portfolio Management

- User assets are stored as objects containing `{ id, amount, date }` in React state, with seamless persistence via `localStorage`.
- The portfolio supports **multiple assets per coin**, each distinguished by its own purchase date.
- The app aggregates these assets to calculate the **total amount held per coin** and the **current portfolio value**.

### Data Fetching & Caching

- Asynchronous data fetching is handled by **React Query**, which provides caching, background updates, and state management.
- Queries are configured with **infinite stale time** and disabled automatic retries for stability.
- React Query’s cache is **persisted to localStorage** and **hydrated** on app startup to avoid redundant network calls.
- Queries utilize **TypeScript generics** for type safety and are **conditionally enabled** based on required dependencies.

### Currency State

- Global currency state (symbol and code) is managed through a dedicated **Redux slice (`currencySlice`)**.
- This state is used throughout the app for API requests and for consistently formatting displayed currency values.

### Key Components

- **`Portfolio.tsx`**: The main portfolio interface, displaying assets, and including dialogs for adding new assets with calendar and coin search functionalities.
- **`OneHourPercentage.tsx`**: Shows price change indicators with arrows and color-coded percentages.
- **`AssetInfo.tsx`** & **`AssetPercentage.tsx`**: Components that format and display numeric asset information alongside currency symbols and descriptive labels.
- **`AlertError.tsx`**: Displays network error alerts with a countdown timer for automatic retries.
- **`SearchCoins.tsx`**: Provides autocomplete functionality for selecting cryptocurrencies by name or symbol.

### Utilities

- `formatAmountUnit(amount: number)`  
  Formats large numeric values with suffixes such as `k` (thousands), `mln` (millions), and `bln` (billions).
  
- `handleKeyDown(e)`  
  Restricts keyboard input to digits, navigation keys, decimal points, and minus signs, improving input validation.
  
- `isDotAtTheEnd(amountInput, e)`  
  Prevents multiple decimal points from being entered consecutively in input fields.

### Error Handling

- Network errors trigger a visible alert with a **countdown timer**, automatically refetching data when the timer expires.
- Errors originating from React Query or Axios requests are properly surfaced and managed via the `AlertError` component.

### Styling

- The UI uses **TailwindCSS** with dark mode enabled via the `"class"` strategy.
- A custom color palette extends the default theme with muted and accent colors.
- Components are styled responsively and accessibly using Tailwind’s utility-first classes.

### Future Improvements

- Add portfolio export/import feature.
- Enhance charting with historical price graphs using recharts.
- Support multi-currency portfolios and conversion.
- Add user authentication for server-side portfolio syncing.

### License

MIT © Corty
