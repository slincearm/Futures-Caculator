import { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar'
import { InputCard } from './components/InputCard'
import { ResultPanel } from './components/ResultPanel'
import { AdvicePanel } from './components/AdvicePanel';
import type { InputState, Currency } from './types'
import { CONSTANTS } from './types'
import { calculateResults } from './utils/finance'

import { translations, type Language } from './utils/translations';

function App() {
  const [currency, setCurrency] = useState<Currency>('TWD');
  const [strategyMultiplier, setStrategyMultiplier] = useState<number | null>(3);
  const [language, setLanguage] = useState<Language>('zh');

  const t = translations[language];

  const [inputState, setInputState] = useState<InputState>({
    contractMonth: '2412',
    currentPrice: 2750,
    lots: 1,
    exchangeRate: 31.495,
    balanceUSD: 8751,
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
    const totalIM = inputState.initialMargin * inputState.lots;
    return (recommendedEquity / totalIM) * 100;
  }, [recommendedEquity, inputState.lots, inputState.initialMargin]);

  // Real-time calculation
  const results = useMemo(() => calculateResults(inputState), [inputState]);

  // TODO: 串接 API - Connect API for real-time price and exchange rate updates
  // useEffect(() => {
  //   // Future implementation: Fetch MGC price and USD/TWD rate here
  // }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-yellow-500/30 overflow-x-hidden">
      <div className="w-full max-w-md mx-auto min-h-screen shadow-2xl bg-slate-900 border-x border-white/5 flex flex-col">

        <Navbar
          currency={currency}
          setCurrency={setCurrency}
          exchangeRate={inputState.exchangeRate}
          setExchangeRate={(rate) => handleInputChange('exchangeRate', rate)}
          language={language}
          setLanguage={setLanguage}
          t={t}
        />

        <main className="flex-1 p-3 sm:p-5 space-y-4 sm:space-y-6 overflow-y-auto pb-20 touch-pan-y">

          <ResultPanel
            result={results}
            currency={currency}
            exchangeRate={inputState.exchangeRate}
            recommendedEquity={recommendedEquity}
            recommendedRiskRatio={recommendedRiskRatio}
            strategyMultiplier={strategyMultiplier}
            onStrategyChange={handleStrategyChange}
            t={t}
          />

          <InputCard
            state={inputState}
            onChange={handleInputChange}
            t={t}
          />

          <AdvicePanel result={results} t={t} />

          <div className="text-center text-xs text-slate-600 pb-4 whitespace-pre-line">
            {t.footer}
          </div>
        </main>

      </div>
    </div>
  )
}

export default App
