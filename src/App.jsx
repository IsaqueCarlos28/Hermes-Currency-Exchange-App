import { useEffect, useMemo, useState } from 'react';
import styles from './App.module.css';

import Header from './components/organisms/Header/Header';
import PageIntro from './components/molecules/PageIntro/PageIntro';
import CurrencyConverter from './components/organisms/CurrencyConverter/CurrencyConverter';
import HistorySection from './components/organisms/HistorySection/HistorySection';
import RatesTableSection from './components/organisms/RatesTableSection/RatesTableSection';

import { DEFAULTS } from './constants/defaults';
import { PERIODS } from './constants/periods';
import { getLabels } from './constants/i18n';

// Mock data based on the API patterns (documentation/API_TESTS.md)
const MOCK_CURRENCIES = ['USD', 'BRL', 'EUR', 'GBP', 'JPY'];
const MOCK_LATEST_RATE = { rate: 5.4218, date: '2026-10-27' };
const MOCK_HISTORICAL_RATES = [
  { date: '2026-10-27', rate: 5.4218 },
  { date: '2026-10-26', rate: 5.4102 },
  { date: '2026-10-23', rate: 5.3987 },
  { date: '2026-10-22', rate: 5.431 },
  { date: '2026-10-21', rate: 5.4156 },
  { date: '2026-10-20', rate: 5.3874 },
  { date: '2026-10-19', rate: 5.3791 },
  { date: '2026-10-16', rate: 5.3842 },
  { date: '2026-10-15', rate: 5.3908 },
  { date: '2026-10-14', rate: 5.3765 },
  { date: '2026-10-13', rate: 5.3981 },
  { date: '2026-10-12', rate: 5.4057 },
  { date: '2026-10-09', rate: 5.3962 },
  { date: '2026-10-08', rate: 5.3814 },
  { date: '2026-10-07', rate: 5.3859 },
  { date: '2026-10-06', rate: 5.3902 },
  { date: '2026-10-05', rate: 5.3748 },
  { date: '2026-10-02', rate: 5.3681 },
  { date: '2026-10-01', rate: 5.3726 },
  { date: '2026-09-30', rate: 5.3604 },
  { date: '2026-09-29', rate: 5.3558 },
];

function App() {
  const [from, setFrom] = useState(DEFAULTS.from);
  const [to, setTo] = useState(DEFAULTS.to);
  const [amount, setAmount] = useState('100');
  const [period, setPeriod] = useState(DEFAULTS.period);
  const [language, setLanguage] = useState(DEFAULTS.language);

  const labels = getLabels(language);

  useEffect(() => {
    const documentLanguage = { PT: 'pt-BR', EN: 'en', ES: 'es' };
    document.documentElement.lang = documentLanguage[language] || 'pt-BR';
  }, [language]);

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  const amountError = useMemo(() => {
    if (String(amount).trim() === '') return labels.converter.amountRequired;
    const parsed = Number(String(amount).replace(',', '.'));
    if (Number.isNaN(parsed)) return labels.converter.amountInvalid;
    if (parsed <= 0) return labels.converter.amountRequired;
    return '';
  }, [amount, labels]);

  const pairError = from === to ? labels.converter.sameCurrencies : '';

  const converted = useMemo(() => {
    if (amountError || pairError) return undefined;
    return Number(String(amount).replace(',', '.')) * MOCK_LATEST_RATE.rate;
  }, [amount, amountError, pairError]);

  const tableRows = useMemo(
    () => MOCK_HISTORICAL_RATES.map((rate) => ({ date: rate.date, from, to, rate: rate.rate })),
    [from, to],
  );

  return (
    <div className={styles.app}>
      <Header language={language} onLanguageChange={setLanguage} />

      <PageIntro title={labels.intro.title} description={labels.intro.description} />

      <CurrencyConverter
        currencies={MOCK_CURRENCIES}
        from={from}
        to={to}
        amount={amount}
        rate={MOCK_LATEST_RATE.rate}
        rateDate={MOCK_LATEST_RATE.date}
        converted={converted}
        status="success"
        language={language}
        labels={labels.converter}
        errors={{ amount: amountError, pair: pairError }}
        onFromChange={setFrom}
        onToChange={setTo}
        onAmountChange={setAmount}
        onSwap={handleSwap}
      />

      <HistorySection
        period={period}
        periods={PERIODS}
        onPeriodChange={setPeriod}
        rates={MOCK_HISTORICAL_RATES}
        from={from}
        to={to}
        status="success"
        language={language}
        labels={labels.history}
      />

      <RatesTableSection
        rates={tableRows}
        from={from}
        to={to}
        status="success"
        language={language}
        labels={labels.table}
      />
    </div>
  );
}

export default App;
