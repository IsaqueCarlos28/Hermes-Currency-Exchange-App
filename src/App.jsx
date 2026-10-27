import { useState } from 'react';
import './App.css';
import styles from './App.module.css';

import Header from './components/organisms/Header/Header';
import PageIntro from './components/molecules/PageIntro/PageIntro';
import CurrencyConverter from './components/organisms/CurrencyConverter/CurrencyConverter';
import HistorySection from './components/organisms/HistorySection/HistorySection';
import RatesTableSection from './components/organisms/RatesTableSection/RatesTableSection';

import { DEFAULTS } from './constants/defaults';
import { PERIODS } from './constants/periods';
import { I18N } from './constants/i18n';

// Mock data based on API patterns
const MOCK_CURRENCIES = ['USD', 'BRL', 'EUR', 'GBP', 'JPY'];
const MOCK_LATEST_RATE = { rate: 5.4218, date: '2026-10-27' };
const MOCK_HISTORICAL_RATES = [
  { date: '2026-10-27', rate: 5.4218 },
  { date: '2026-10-24', rate: 5.4100 },
  { date: '2026-10-23', rate: 5.3985 },
  { date: '2026-10-22', rate: 5.4150 },
  { date: '2026-10-21', rate: 5.4205 },
  { date: '2026-10-20', rate: 5.4123 },
  { date: '2026-09-27', rate: 5.3890 },
];

function App() {
  const [from, setFrom] = useState(DEFAULTS.from);
  const [to, setTo] = useState(DEFAULTS.to);
  const [amount, setAmount] = useState('100');
  const [period, setPeriod] = useState(DEFAULTS.period);
  const [language, setLanguage] = useState(DEFAULTS.language);

  const t = I18N[language] || I18N.PT;

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  const converted = amount && !isNaN(Number(String(amount).replace(',', '.')))
    ? (Number(String(amount).replace(',', '.')) * MOCK_LATEST_RATE.rate).toFixed(2)
    : undefined;

  return (
    <div className={styles.app}>
      <Header language={language} onLanguageChange={setLanguage} />
      <PageIntro title={t.title} description={t.description} />
      <CurrencyConverter
        currencies={MOCK_CURRENCIES}
        from={from}
        to={to}
        amount={amount}
        rate={MOCK_LATEST_RATE.rate}
        rateDate={MOCK_LATEST_RATE.date}
        status="success"
        onFromChange={setFrom}
        onToChange={setTo}
        onAmountChange={setAmount}
        onSwap={handleSwap}
        converted={converted}
      />
      <HistorySection 
        period={period} 
        onPeriodChange={setPeriod} 
        rates={MOCK_HISTORICAL_RATES} 
        from={from} 
        to={to} 
        status="success" 
        periods={PERIODS} 
      />
      <RatesTableSection 
        rates={MOCK_HISTORICAL_RATES.map(r => ({ date: r.date, from, to, rate: r.rate }))} 
        from={from} 
        to={to} 
        period={period} 
        status="success" 
      />
    </div>
  );
}

export default App;
