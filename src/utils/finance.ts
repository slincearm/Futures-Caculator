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

    // 3. Margin Call Price
    const equitySurplus = totalEquityUSD - totalMM;
    const priceDropToCall = lots > 0 ? equitySurplus / (lots * CONSTANTS.CONTRACT_SIZE) : 0;
    const marginCallPrice = lots > 0 ? currentPrice - priceDropToCall : 0;

    // 4. Liquidation Price
    const priceDropTo0 = lots > 0 ? totalEquityUSD / (lots * CONSTANTS.CONTRACT_SIZE) : 0;
    const liquidationPrice = lots > 0 ? currentPrice - priceDropTo0 : 0;

    // Status
    const isCall = lots > 0 && totalEquityUSD < totalMM;
    const isLiquidated = totalEquityUSD <= 0;

    return {
        totalEquityUSD,
        totalEquityTWD,
        riskRatio,
        marginCallPrice,
        liquidationPrice,
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
