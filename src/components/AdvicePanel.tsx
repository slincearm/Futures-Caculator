import React from 'react';
import type { CalculationResult } from '../types';

interface AdvicePanelProps {
    result: CalculationResult;
}

export const AdvicePanel: React.FC<AdvicePanelProps> = ({ result }) => {
    return (
        <div className="bg-blue-500/10 border border-blue-500/10 rounded-xl p-4">
            <div className="flex items-start gap-3">
                <div className="mt-0.5 text-blue-400">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                </div>
                <div className="text-xs text-blue-200/80 space-y-1">
                    <p className="font-semibold text-blue-200">財務建議</p>
                    {result.riskRatio < 150 && (
                        <p>• 您的風險較高，建議補足保證金以提升至 150% 以上。</p>
                    )}
                    {result.riskRatio < 120 && (
                        <p className="text-red-300">• 警告：接近催繳水位，請留意市場波動。</p>
                    )}
                    <p>• 請留意合約月份，接近結算日請提早轉倉。</p>
                </div>
            </div>
        </div>
    );
};
