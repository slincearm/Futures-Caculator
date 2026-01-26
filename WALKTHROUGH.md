# MGC Futures Monitor - Walkthrough

## Overview
A high-performance, mobile-optimized risk monitor for Micro Gold Futures (MGC), designed for the iPhone 17 Pro Max. The application features real-time dual-currency (USD/TWD) equity calculation, margin risk analysis, and automatic strategy configuration.

## Features Implemented

### 1. Mobile-First Premium UI
-   **Dark Mode**: Sleek slate-900 theme with gold accents.
-   **Responsiveness**: Optimized for iPhone 17 Pro Max with full-width inputs and sticky elements.
-   **Touch Friendly**: Large touch targets for toggles and buttons.

### 2. Core Financial Logic
-   **Real-time Equity**: Automatically calculates Total Equity in USD or TWD based on exchange rate.
-   **Risk Indicator**: 
    -   **Safe (>150%)**: Green
    -   **Warning (110-150%)**: Yellow
    -   **Danger (<110%)**: Red
-   **Critical Price Levels**:
    -   **Margin Call**: Calculated dynamic price point where Equity < Maintenance Margin.
    -   **Liquidation**: Bankruptcy price point.

### 3. Interactive Inputs
-   **Currency Toggle**: Global switch for viewing results in TWD or USD.
-   **One-Click Strategy**: "3x Margin Strategy" button instantly configures balances for a standard safe allocation (`3 * IM`).
-   **Margin Configuration**: Adjustable Initial Margin (IM) and Maintenance Margin (MM) directly from the input card.

## File Structure
-   `src/components/Navbar.tsx`: Header and Currency Logic.
-   `src/components/InputCard.tsx`: Data entry form.
-   `src/components/ResultPanel.tsx`: Visual dashboard for risk metrics.
-   `src/utils/finance.ts`: Centralized financial mathematics.

## Verification
-   **Build**: Passed TypeScript strict checks (`npm run build`).
-   **Logic**: Validated 3x Margin Strategy yields ~330% Risk Ratio.
