import { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar'
import { InputCard } from './components/InputCard'
import { ResultPanel } from './components/ResultPanel'
import { AdvicePanel } from './components/AdvicePanel';
import type { InputState, Currency } from './types'
import { CONSTANTS } from './types'
import { calculateResults } from './utils/finance'

function App() {
  const [currency, setCurrency] = useState<Currency>('TWD');
  const [strategyMultiplier, setStrategyMultiplier] = useState<number | null>(null);

  const [inputState, setInputState] = useState<InputState>({
    contractMonth: '2412',
    currentPrice: 2750,
    lots: 1,
    exchangeRate: 31.495,
    balanceUSD: 28078.5,
    balanceTWD: 102251,
    initialMargin: CONSTANTS.IM,
    maintenanceMargin: CONSTANTS.MM,
  });

  const handleInputChange = (key: keyof InputState, value: string | number) => {
    setInputState(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleStrategyChange = (multiplier: number | null) => {
    setStrategyMultiplier(multiplier);
  };

  // Recommended Equity Calculation
  const recommendedEquity = useMemo(() => {
    if (!strategyMultiplier) return null;
    return inputState.initialMargin * strategyMultiplier * inputState.lots;
  }, [inputState.initialMargin, inputState.lots, strategyMultiplier]);

  // Recommended Risk Ratio Calculation
  const recommendedRiskRatio = useMemo(() => {
    if (!recommendedEquity || inputState.lots === 0) return null;
    const totalMM = inputState.maintenanceMargin * inputState.lots;
    return (recommendedEquity / totalMM) * 100;
  }, [recommendedEquity, inputState.lots, inputState.maintenanceMargin]);

  // Real-time calculation
  const results = useMemo(() => calculateResults(inputState), [inputState]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-yellow-500/30">
      <div className="max-w-md mx-auto min-h-screen shadow-2xl bg-slate-900 border-x border-white/5 flex flex-col">

        <Navbar
          currency={currency}
          setCurrency={setCurrency}
          exchangeRate={inputState.exchangeRate}
          setExchangeRate={(rate) => handleInputChange('exchangeRate', rate)}
        />

        <main className="flex-1 p-5 space-y-6 overflow-y-auto pb-20 touch-pan-y">

          <ResultPanel
            result={results}
            currency={currency}
            exchangeRate={inputState.exchangeRate}
            initialMargin={inputState.initialMargin}
            maintenanceMargin={inputState.maintenanceMargin}
            recommendedEquity={recommendedEquity}
            recommendedRiskRatio={recommendedRiskRatio}
            strategyMultiplier={strategyMultiplier}
            onStrategyChange={handleStrategyChange}
          />

          <InputCard
            state={inputState}
            onChange={handleInputChange}
          />

          <AdvicePanel result={results} />

          <div className="text-center text-xs text-slate-600 pb-4">
            MGC Micro Gold Risk Monitor © 2026<br />
            Optimized for iPhone 17 Pro Max
          </div>
        </main>

      </div>
    </div>
  )
}

export default App
