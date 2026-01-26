import React from 'react';
import type { CalculationResult, Currency } from '../types';

interface ResultPanelProps {
    result: CalculationResult;
    currency: Currency;
    exchangeRate: number;
    initialMargin: number;
    maintenanceMargin: number;
    recommendedEquity?: number | null;
    recommendedRiskRatio?: number | null;
    strategyMultiplier: number | null;
    onStrategyChange: (multiplier: number | null) => void;
}

export const ResultPanel: React.FC<ResultPanelProps> = ({ result, currency, initialMargin, maintenanceMargin, recommendedEquity, recommendedRiskRatio, strategyMultiplier, onStrategyChange }) => {

    const displayedEquity = currency === 'USD' ? result.totalEquityUSD : result.totalEquityTWD;
    const currencySymbol = currency === 'USD' ? '$' : 'NT$';

    let riskColor = 'text-red-500';
    let riskBg = 'bg-red-500/10 border-red-500/20';
    let statusText = '危險 High Risk';

    if (result.riskRatio > 150) {
        riskColor = 'text-emerald-400';
        riskBg = 'bg-emerald-500/10 border-emerald-500/20';
        statusText = '安全 Safe';
    } else if (result.riskRatio >= 110) {
        riskColor = 'text-yellow-400';
        riskBg = 'bg-yellow-500/10 border-yellow-500/20';
        statusText = '注意 Warning';
    }

    const fmt = (n: number) => n.toLocaleString('zh-TW', { minimumFractionDigits: 0, maximumFractionDigits: 1 });

    return (
        <div className="space-y-4">
            {/* Main Equity Card */}
            <div className={`relative overflow-hidden rounded-2xl p-6 border ${riskBg} transition-all duration-500`}>
                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-1">
                        <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">總權益 Total Equity</p>
                        <select
                            value={strategyMultiplier || ''}
                            onChange={(e) => {
                                const val = e.target.value ? parseInt(e.target.value) : null;
                                onStrategyChange(val);
                            }}
                            className="bg-slate-800/80 text-xs text-white border border-white/10 rounded-lg px-2 py-1 outline-none focus:border-indigo-500 appearance-none cursor-pointer"
                        >
                            <option value="">自訂策略 Custom</option>
                            <option value="2">2倍保證金策略</option>
                            <option value="3">3倍保證金策略</option>
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
                                建議權益: $ {fmt(recommendedEquity)}
                            </span>
                        </div>
                    )}

                    <div className="mt-4 flex items-center justify-between">
                        <div>
                            <p className="text-slate-400 text-xs mb-0.5">風險指標 Risk Ratio</p>
                            <div className="flex items-center gap-2">
                                <p className={`text-xl font-bold ${riskColor}`}>{fmt(result.riskRatio)}%</p>
                                {recommendedRiskRatio && (
                                    <>
                                        <span className="text-slate-500">➜</span>
                                        <p className="text-lg font-bold text-indigo-400/80">{fmt(recommendedRiskRatio)}%</p>
                                    </>
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

            {/* Critical Prices & Margins Grid */}
            <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-800/40 border border-white/5 rounded-xl p-4">
                    <p className="text-xs text-slate-500 mb-1">原始保證金 (IM)</p>
                    <p className="text-lg font-mono font-semibold text-slate-200">
                        {fmt(initialMargin)}
                    </p>
                </div>
                <div className="bg-slate-800/40 border border-white/5 rounded-xl p-4">
                    <p className="text-xs text-slate-500 mb-1">維持保證金 (MM)</p>
                    <p className="text-lg font-mono font-semibold text-slate-200">
                        {fmt(maintenanceMargin)}
                    </p>
                </div>
                <div className="bg-slate-800/40 border border-white/5 rounded-xl p-4">
                    <p className="text-xs text-slate-500 mb-1">催繳點數 (USD)</p>
                    <p className="text-lg font-mono font-semibold text-orange-300">
                        {fmt(result.marginCallPrice)}
                    </p>
                </div>
                <div className="bg-slate-800/40 border border-white/5 rounded-xl p-4">
                    <p className="text-xs text-slate-500 mb-1">強制平倉 (USD)</p>
                    <p className="text-lg font-mono font-semibold text-red-400">
                        {fmt(result.liquidationPrice)}
                    </p>
                </div>
            </div>
        </div>
    );
};
