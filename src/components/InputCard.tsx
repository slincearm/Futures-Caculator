import React from 'react';
import type { InputState } from '../types';

interface InputCardProps {
    state: InputState;
    onChange: (key: keyof InputState, value: string | number) => void;
    t: any;
}

export const InputCard: React.FC<InputCardProps> = ({ state, onChange, t }) => {

    const handleNumberChange = (key: keyof InputState, e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseFloat(e.target.value);
        onChange(key, isNaN(val) ? 0 : val);
    };

    return (
        <div className="p-4 sm:p-5 bg-slate-800/40 backdrop-blur-sm rounded-2xl border border-white/5 space-y-4">

            <div className="grid grid-cols-2 gap-4">
                {/* Row 1 - Lots */}
                <div className="col-span-2 space-y-1.5">
                    <label className="text-xs text-slate-400">{t.holdings}</label>
                    <input
                        type="number"
                        inputMode="decimal"
                        pattern="[0-9]*"
                        value={state.lots || ''}
                        onChange={(e) => handleNumberChange('lots', e)}
                        placeholder="1"
                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-3 py-2.5 text-slate-100 focus:outline-none focus:ring-1 focus:ring-yellow-500 transition-all text-sm font-mono placeholder:text-slate-600 text-center text-lg sm:text-lg"
                    />
                </div>

                {/* Row 1.5 - Margins Inputs */}
                <div className="col-span-2 grid grid-cols-2 gap-3 pb-2 border-b border-white/5">
                    <div className="bg-slate-900/30 border border-white/5 rounded-lg p-2 sm:p-3 relative group focus-within:ring-1 focus-within:ring-indigo-500/50 transition-all">
                        <label className="text-[10px] text-slate-500 mb-1 block">{t.initialMargin}</label>
                        <input
                            type="number"
                            inputMode="decimal"
                            pattern="[0-9]*"
                            value={state.initialMargin || ''}
                            onChange={(e) => handleNumberChange('initialMargin', e)}
                            className="w-full bg-transparent text-sm font-mono font-semibold text-slate-300 focus:outline-none placeholder:text-slate-700"
                        />
                    </div>
                    <div className="bg-slate-900/30 border border-white/5 rounded-lg p-2 sm:p-3 relative group focus-within:ring-1 focus-within:ring-indigo-500/50 transition-all">
                        <label className="text-[10px] text-slate-500 mb-1 block">{t.maintenanceMargin}</label>
                        <input
                            type="number"
                            inputMode="decimal"
                            pattern="[0-9]*"
                            value={state.maintenanceMargin || ''}
                            onChange={(e) => handleNumberChange('maintenanceMargin', e)}
                            className="w-full bg-transparent text-sm font-mono font-semibold text-slate-300 focus:outline-none placeholder:text-slate-700"
                        />
                    </div>
                </div>

                {/* Row 2 - Balances */}
                <div className="col-span-2 grid grid-cols-2 gap-4 pt-2">
                    <div className="space-y-1.5">
                        <label className="text-xs text-slate-400">{t.usdEquity}</label>
                        <input
                            type="number"
                            inputMode="decimal"
                            pattern="[0-9]*"
                            value={state.balanceUSD || ''}
                            onChange={(e) => handleNumberChange('balanceUSD', e)}
                            placeholder="0.00"
                            className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-3 py-2.5 text-slate-100 focus:outline-none focus:ring-1 focus:ring-yellow-500 transition-all text-sm font-mono placeholder:text-slate-600"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs text-slate-400">{t.twdEquity}</label>
                        <input
                            type="number"
                            inputMode="decimal"
                            pattern="[0-9]*"
                            value={state.balanceTWD || ''}
                            onChange={(e) => handleNumberChange('balanceTWD', e)}
                            placeholder="0"
                            className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-3 py-2.5 text-slate-100 focus:outline-none focus:ring-1 focus:ring-yellow-500 transition-all text-sm font-mono placeholder:text-slate-600"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
