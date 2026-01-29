import React from 'react';
import type { Currency } from '../types';

import type { Language } from '../utils/translations';

interface NavbarProps {
    currency: Currency;
    setCurrency: (c: Currency) => void;
    exchangeRate: number;
    setExchangeRate: (rate: number) => void;
    language: Language;
    setLanguage: (l: Language) => void;
    t: any;
}

export const Navbar: React.FC<NavbarProps> = ({ currency, setCurrency, exchangeRate, setExchangeRate, language, setLanguage, t }) => {
    return (
        <nav className="flex items-center justify-between px-3 sm:px-4 py-4 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-white/10">
            <h1 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 truncate mr-2">
                {t.title}
            </h1>

            <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center bg-slate-800 rounded-full px-3 py-1 border border-white/10">
                    <span className="text-xs text-slate-400 mr-2">{t.currencyLabel}</span>
                    <input
                        type="number"
                        value={exchangeRate || ''}
                        onChange={(e) => setExchangeRate(parseFloat(e.target.value))}
                        className="w-16 bg-transparent text-sm text-right font-mono text-white focus:outline-none"
                        placeholder="32.5"
                        step="0.01"
                    />
                </div>
                {/* Mobile version of exchange rate input - smaller */}
                <div className="sm:hidden flex items-center bg-slate-800 rounded-full px-2 py-1 border border-white/10">
                    <input
                        type="number"
                        value={exchangeRate || ''}
                        onChange={(e) => setExchangeRate(parseFloat(e.target.value))}
                        className="w-12 bg-transparent text-xs text-right font-mono text-white focus:outline-none"
                        placeholder="32.5"
                    />
                </div>

                <div className="flex bg-slate-800 rounded-full p-1 border border-white/10 shrink-0">
                    <button
                        onClick={() => setCurrency('USD')}
                        className={`px-3 py-1.5 rounded-full text-[10px] font-medium transition-all duration-300 ${currency === 'USD'
                            ? 'bg-yellow-500 text-slate-900 shadow-lg shadow-yellow-500/20'
                            : 'text-slate-400 hover:text-white'
                            }`}
                    >
                        USD
                    </button>
                    <button
                        onClick={() => setCurrency('TWD')}
                        className={`px-3 py-1.5 rounded-full text-[10px] font-medium transition-all duration-300 ${currency === 'TWD'
                            ? 'bg-yellow-500 text-slate-900 shadow-lg shadow-yellow-500/20'
                            : 'text-slate-400 hover:text-white'
                            }`}
                    >
                        TWD
                    </button>
                    <div className="w-[1px] bg-white/10 mx-1"></div>
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value as Language)}
                        className="bg-transparent text-[10px] font-medium text-slate-400 hover:text-white focus:outline-none appearance-none pl-1 pr-1 cursor-pointer text-center min-w-[3.5rem]"
                    >
                        <option value="zh">中文</option>
                        <option value="en">EN</option>
                    </select>
                </div>
            </div>
        </nav>
    );
};
