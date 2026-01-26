export interface InputState {
    contractMonth: string;
    currentPrice: number;
    lots: number;
    exchangeRate: number;
    balanceUSD: number;
    balanceTWD: number;
    initialMargin: number;
    maintenanceMargin: number;
}

export type Currency = 'USD' | 'TWD';

export interface CalculationResult {
    totalEquityUSD: number;
    totalEquityTWD: number;
    riskRatio: number; // Percentage
    marginCallPrice: number;
    liquidationPrice: number;
    isCall: boolean;
    isLiquidated: boolean;
}

export const CONSTANTS = {
    IM: 2739, // Initial Margin
    MM: 2490, // Maintenance Margin
    CONTRACT_SIZE: 10, // 10 oz per lot
};
