import React from 'react';
import type { CalculationResult, Currency } from '../types';

interface ResultPanelProps {
    result: CalculationResult;
    currency: Currency;
    exchangeRate: number;
    recommendedEquity?: number | null;
    recommendedRiskRatio?: number | null;
    strategyMultiplier: number | null;
    onStrategyChange: (multiplier: number | null) => void;
    t: any;
}

export const ResultPanel: React.FC<ResultPanelProps> = ({ result, currency, recommendedEquity, recommendedRiskRatio, strategyMultiplier, onStrategyChange, t }) => {

    const displayedEquity = currency === 'USD' ? result.totalEquityUSD : result.totalEquityTWD;
    const currencySymbol = currency === 'USD' ? '$' : 'NT$';

    let riskColor = 'text-red-500';
    let riskBg = 'bg-red-500/10 border-red-500/20';
    let statusText = t.highRisk;

    if (result.riskRatio > 150) {
        riskColor = 'text-emerald-400';
        riskBg = 'bg-emerald-500/10 border-emerald-500/20';
        statusText = t.safe;
    } else if (result.riskRatio >= 110) {
        riskColor = 'text-yellow-400';
        riskBg = 'bg-yellow-500/10 border-yellow-500/20';
        statusText = t.warning;
    }

    const fmt = (n: number) => n.toLocaleString('zh-TW', { minimumFractionDigits: 0, maximumFractionDigits: 1 });

    return (
        <div className="space-y-4">
            {/* Main Equity Card */}
            <div className={`relative overflow-hidden rounded-2xl p-6 border ${riskBg} transition-all duration-500`}>
                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-1">
                        <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">{t.totalEquity}</p>
                        <select
                            value={strategyMultiplier || ''}
                            onChange={(e) => {
                                const val = e.target.value ? parseInt(e.target.value) : null;
                                onStrategyChange(val);
                            }}
                            className="bg-slate-800/80 text-xs text-white border border-white/10 rounded-lg px-2 py-1 outline-none focus:border-indigo-500 appearance-none cursor-pointer"
                        >
                            <option value="2">{t.strategy2x}</option>
                            <option value="3">{t.strategy3x}</option>
                        </select>
                    </div>

                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-white tracking-tight">
                            {currencySymbol} {fmt(displayedEquity)}
                        </span>
                    </div>

                    {recommendedEquity && (
                        <div className="mt-2 text-xs">
                            <span className="text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-md">
                                {t.recommendedTotalEquity}: $ {fmt(recommendedEquity)}
                            </span>
                        </div>
                    )}

                    <div className="mt-4 flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-6">
                                <div>
                                    <p className="text-slate-400 text-xs mb-0.5">{t.riskRatio}</p>
                                    <p className={`text-xl font-bold ${riskColor}`}>{fmt(result.riskRatio)}%</p>
                                </div>

                                {recommendedRiskRatio && (
                                    <div>
                                        <p className="text-slate-400 text-xs mb-0.5">{t.recommendedRiskRatio}</p>
                                        <p className="text-xl font-bold text-indigo-400/80">{fmt(recommendedRiskRatio)}%</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-bold border ${riskBg} ${riskColor}`}>
                            {statusText}
                        </div>
                    </div>
                </div>

                {/* Background Glow */}
                <div className={`absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 rounded-full blur-3xl opacity-20 ${riskColor.replace('text-', 'bg-')}`}></div>
            </div>
        </div>
    );
};
