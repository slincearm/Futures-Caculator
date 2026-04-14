import type { InputState, CalculationResult } from '../types';
import { CONSTANTS } from '../types';

export const calculateResults = (state: InputState): CalculationResult => {
    const { currentPrice, lots, exchangeRate, balanceUSD, balanceTWD, initialMargin, maintenanceMargin } = state;

    // Handle invalid exchange rate
    const safeRate = exchangeRate > 0 ? exchangeRate : 1;

    // 1. Calculate Total Equity
    // Equity (USD)
    const totalEquityUSD = balanceUSD + (balanceTWD / safeRate);

    // Equity (TWD)
    const totalEquityTWD = (balanceUSD * safeRate) + balanceTWD;

    // 2. Risk Indicators
    const totalMM = maintenanceMargin * lots;
    const totalIM = initialMargin * lots;

    const riskRatio = lots > 0 ? (totalEquityUSD / totalIM) * 100 : 0;

    // Margin Call Risk Ratio is 130%
    const callEquityTarget = totalIM * 1.30;
    // Liquidation Risk Ratio is 25%
    const liquidationEquityTarget = totalIM * 0.25;

    const dropToCallUSD = totalEquityUSD - callEquityTarget;
    const dropToLiquidationUSD = totalEquityUSD - liquidationEquityTarget;

    const pointsToMarginCall = lots > 0 && dropToCallUSD > 0 ? dropToCallUSD / (lots * CONSTANTS.CONTRACT_SIZE) : 0;
    const pointsToLiquidation = lots > 0 && dropToLiquidationUSD > 0 ? dropToLiquidationUSD / (lots * CONSTANTS.CONTRACT_SIZE) : 0;

    // 3. Margin Call Price
    const marginCallPrice = lots > 0 ? currentPrice - pointsToMarginCall : 0;

    // 4. Liquidation Price
    const liquidationPrice = lots > 0 ? currentPrice - pointsToLiquidation : 0;

    // Status
    const isCall = lots > 0 && riskRatio <= 130;
    const isLiquidated = lots > 0 && riskRatio <= 25;

    return {
        totalEquityUSD,
        totalEquityTWD,
        riskRatio,
        marginCallPrice,
        liquidationPrice,
        pointsToMarginCall,
        pointsToLiquidation,
        isCall,
        isLiquidated
    };
};

export const formatNumber = (num: number, limit = 2) => {
    return num.toLocaleString('zh-TW', { minimumFractionDigits: 0, maximumFractionDigits: limit });
};

export const formatCurrency = (num: number, currency: 'USD' | 'TWD') => {
    return new Intl.NumberFormat('zh-TW', { style: 'currency', currency }).format(num);
};
