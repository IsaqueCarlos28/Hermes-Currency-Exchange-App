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
import { validateAmount } from './utils/validateAmount';

const INITIAL_AMOUNT = '100';

function App() {
  const [from, setFrom] = useState(DEFAULTS.from);
  const [to, setTo] = useState(DEFAULTS.to);
  const [amount, setAmount] = useState(INITIAL_AMOUNT);
  const [appliedAmount, setAppliedAmount] = useState(INITIAL_AMOUNT);
  const [period, setPeriod] = useState(DEFAULTS.period);
  const [language, setLanguage] = useState(DEFAULTS.language);

  const labels = getLabels(language);

  useEffect(() => {
    const documentLanguage = { PT: 'pt-BR', EN: 'en', ES: 'es' };
    document.documentElement.lang = documentLanguage[language] || 'pt-BR';
  }, [language]);

  const {
    currencies,
    status: currenciesStatus,
    retry: retryCurrencies,
  } = useCurrencies();
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

  const amountValidation = useMemo(
    () =>
      validateAmount(amount, {
        required: labels.converter.amountRequired,
        invalid: labels.converter.amountInvalid,
      }),
    [amount, labels],
  );

  const amountError = amountValidation.valid ? '' : amountValidation.error;
  const pairError = from === to ? labels.converter.sameCurrencies : '';

  // O resultado usa o valor confirmado pelo botão Converter. Assim a ação
  // primária tem efeito real sem disparar uma nova consulta de taxa.
  const handleConvert = () => {
    if (!amountValidation.valid || pairError) return;
    setAppliedAmount(String(amount).trim());
  };

  const converted = useMemo(() => {
    if (pairError) return undefined;
    return convertAmount(appliedAmount, latestRate) ?? undefined;
  }, [appliedAmount, pairError, latestRate]);

  return (
    <div className={styles.app}>
      <Header language={language} onLanguageChange={setLanguage} />

      <PageIntro title={labels.intro.title} description={labels.intro.description} />

      <CurrencyConverter
        currencies={currencies}
        currenciesStatus={currenciesStatus}
        from={from}
        to={to}
        amount={amount}
        appliedAmount={appliedAmount}
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
        onConvert={handleConvert}
        onRetry={handleRetryConverter}
        onRetryCurrencies={retryCurrencies}
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
