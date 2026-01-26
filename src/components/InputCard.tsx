import React from 'react';
import type { InputState } from '../types';

interface InputCardProps {
    state: InputState;
    onChange: (key: keyof InputState, value: string | number) => void;
}

export const InputCard: React.FC<InputCardProps> = ({ state, onChange }) => {

    const handleNumberChange = (key: keyof InputState, e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseFloat(e.target.value);
        onChange(key, isNaN(val) ? 0 : val);
    };

    return (
        <div className="p-5 bg-slate-800/40 backdrop-blur-sm rounded-2xl border border-white/5 space-y-4">

            <div className="grid grid-cols-2 gap-4">
                {/* Row 1 - Lots Only */}
                <div className="col-span-2 space-y-1.5">
                    <label className="text-xs text-slate-400">買入口數 Lots</label>
                    <input
                        type="number"
                        value={state.lots || ''}
                        onChange={(e) => handleNumberChange('lots', e)}
                        placeholder="1"
                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-3 py-2.5 text-slate-100 focus:outline-none focus:ring-1 focus:ring-yellow-500 transition-all text-sm font-mono placeholder:text-slate-600 text-center text-lg"
                    />
                </div>

                {/* Row 2 - Balances */}
                <div className="col-span-2 grid grid-cols-2 gap-4 pt-2 border-t border-white/5">
                    <div className="space-y-1.5">
                        <label className="text-xs text-slate-400">美金權益總值 USD Equity</label>
                        <input
                            type="number"
                            value={state.balanceUSD || ''}
                            onChange={(e) => handleNumberChange('balanceUSD', e)}
                            placeholder="0.00"
                            className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-3 py-2.5 text-slate-100 focus:outline-none focus:ring-1 focus:ring-yellow-500 transition-all text-sm font-mono placeholder:text-slate-600"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs text-slate-400">台幣權益總值 TWD Equity</label>
                        <input
                            type="number"
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
