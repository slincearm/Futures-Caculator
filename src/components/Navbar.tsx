import React from 'react';
import type { Currency } from '../types';

interface NavbarProps {
    currency: Currency;
    setCurrency: (c: Currency) => void;
    exchangeRate: number;
    setExchangeRate: (rate: number) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currency, setCurrency, exchangeRate, setExchangeRate }) => {
    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-white/10">
            <h1 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
                MGC 監控
            </h1>

            <div className="flex items-center gap-3">
                <div className="flex items-center bg-slate-800 rounded-full px-3 py-1 border border-white/10">
                    <span className="text-xs text-slate-400 mr-2">USD/TWD</span>
                    <input
                        type="number"
                        value={exchangeRate || ''}
                        onChange={(e) => setExchangeRate(parseFloat(e.target.value))}
                        className="w-16 bg-transparent text-sm text-right font-mono text-white focus:outline-none"
                        placeholder="32.5"
                        step="0.01"
                    />
                </div>

                <div className="flex bg-slate-800 rounded-full p-1 border border-white/10">
                    <button
                        onClick={() => setCurrency('USD')}
                        className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${currency === 'USD'
                            ? 'bg-yellow-500 text-slate-900 shadow-lg shadow-yellow-500/20'
                            : 'text-slate-400 hover:text-white'
                            }`}
                    >
                        USD
                    </button>
                    <button
                        onClick={() => setCurrency('TWD')}
                        className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${currency === 'TWD'
                            ? 'bg-yellow-500 text-slate-900 shadow-lg shadow-yellow-500/20'
                            : 'text-slate-400 hover:text-white'
                            }`}
                    >
                        TWD
                    </button>
                </div>
            </div>
        </nav>
    );
};
