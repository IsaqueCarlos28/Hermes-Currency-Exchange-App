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

import { useCurrencies } from './hooks/useCurrencies';
import { useLatestRate } from './hooks/useLatestRate';
import { useHistoricalRates } from './hooks/useHistoricalRates';
import { convertAmount } from './utils/convertAmount';

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

  const { currencies, retry: retryCurrencies } = useCurrencies();
  const {
    rate: latestRate,
    date: latestDate,
    status: latestStatus,
    retry: retryLatest,
  } = useLatestRate(from, to);
  const {
    rates: historyRates,
    status: historyStatus,
    retry: retryHistory,
  } = useHistoricalRates(from, to, period);

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  const handleRetryConverter = () => {
    retryCurrencies();
    retryLatest();
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
    return convertAmount(amount, latestRate) ?? undefined;
  }, [amount, amountError, pairError, latestRate]);

  return (
    <div className={styles.app}>
      <Header language={language} onLanguageChange={setLanguage} />

      <PageIntro title={labels.intro.title} description={labels.intro.description} />

      <CurrencyConverter
        currencies={currencies}
        from={from}
        to={to}
        amount={amount}
        rate={latestRate}
        rateDate={latestDate}
        converted={converted}
        status={latestStatus}
        language={language}
        labels={labels.converter}
        errors={{ amount: amountError, pair: pairError }}
        onFromChange={setFrom}
        onToChange={setTo}
        onAmountChange={setAmount}
        onSwap={handleSwap}
        onRetry={handleRetryConverter}
      />

      <HistorySection
        period={period}
        periods={PERIODS}
        onPeriodChange={setPeriod}
        rates={historyRates}
        from={from}
        to={to}
        status={historyStatus}
        onRetry={retryHistory}
        language={language}
        labels={labels.history}
      />

      <RatesTableSection
        rates={historyRates}
        from={from}
        to={to}
        status={historyStatus}
        onRetry={retryHistory}
        language={language}
        labels={labels.table}
      />
    </div>
  );
}

export default App;
