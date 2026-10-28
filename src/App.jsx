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
import {
  MOCK_CURRENCIES,
  MOCK_HISTORICAL_RATES,
  MOCK_LATEST_RATE,
} from './mocks/data';
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
    return convertAmount(amount, MOCK_LATEST_RATE.rate) ?? undefined;
  }, [amount, amountError, pairError]);

  const tableRows = useMemo(
    () =>
      MOCK_HISTORICAL_RATES.map((row) => ({
        date: row.date,
        from,
        to,
        rate: row.rate,
      })),
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
