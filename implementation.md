# MGC Futures Monitor Implementation Plan

## Goal
Build a mobile-optimized (iPhone 17 Pro Max) web application to monitor Micro Gold Futures (MGC) risk, featuring dual currency display (USD/TWD) and dynamic exchange rate calculations.

## User Requirements
-   **Role**: FinTech Architect.
-   **Tech**: TypeScript, Tailwind CSS, Mobile-First.
-   **Language**: Traditional Chinese.
-   **Core Logic**:
    -   Inputs: Date, Price, Quantity, Exchange Rate, Balances.
    -   Strategy: "3x Margin Strategy" button.
    -   Outputs: Equity, Risk % (Margin Level), Margin Call Price, Liquidation Price.
    -   Real-time updates.

## Architecture

### State Management
-   **`InputState`**:
    -   `contractMonth`: string
    -   `currentPrice`: number
    -   `entryPrice`: number (Added for P&L calculation)
    -   `lots`: number (default 1)
    -   `exchangeRate`: number (default 32.5)
    -   `balanceUSD`: number
    -   `balanceTWD`: number
    -   `initialMargin`: number (Added)
    -   `maintenanceMargin`: number (Added)
-   **`SettingsState`**:
    -   `displayCurrency`: 'USD' | 'TWD' (Global Toggle)

### Components
1.  **`Layout`**: Main container, max-width for mobile, dark theme background.
2.  **`Navbar`**: Title + Currency Toggle.
3.  **`InputCard`**:
    -   Grid layout for inputs.
    -   "Apply Strategy" button (Action).
4.  **`StatsPanel`**:
    -   Display calculated metrics.
    -   Color-coded Risk Indicator.
5.  **`AdviceSection`**:
    -   Conditional text based on risk.

### Financial Logic (`src/utils/finance.ts`)
-   **Constants**:
    -   `IM` (Initial Margin): 2739
    -   `MM` (Maintenance Margin): 2490
    -   `CONTRACT_SIZE`: 10 (10 oz per lot)
-   **Formulas**:
    -   `Equity (USD)` = `BalanceUSD` + `(BalanceTWD / ExchangeRate)` + `(CurrentPrice - EntryPrice) * Lots * 10`
    -   `Risk %` = `(Equity / (MM * Lots)) * 100`

## Plan Steps
1.  **Setup**: Tailwind config (Done), Base Styles.
2.  **Logic**: Implement `finance.ts`.
3.  **UI Construction**: Components.
4.  **Refinement**: iPhone optimization.
