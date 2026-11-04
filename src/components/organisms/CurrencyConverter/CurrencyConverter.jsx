import styles from './CurrencyConverter.module.css';
import AmountInput from '../../molecules/AmountInput/AmountInput';
import CurrencySelect from '../../molecules/CurrencySelect/CurrencySelect';
import SwapButton from '../../atoms/SwapButton/SwapButton';
import ConversionResult from '../../molecules/ConversionResult/ConversionResult';
import Button from '../../atoms/Button/Button';
import { AlertCircle } from 'lucide-react';
import { LABELS } from '../../../constants/i18n';

function CurrencyConverter({
  currencies = [],
  currenciesStatus = 'success',
  from,
  to,
  amount,
  appliedAmount,
  rate,
  rateDate,
  status,
  converted,
  language = 'PT',
  labels = LABELS.PT.converter,
  errors = {},
  onFromChange,
  onToChange,
  onAmountChange,
  onSwap,
  onConvert,
  onRetry,
  onRetryCurrencies,
}) {
  const currenciesUnavailable = currenciesStatus === 'loading' || currenciesStatus === 'error';

  const handleSubmit = (event) => {
    event.preventDefault();
    onConvert?.();
  };

  return (
    <section className={styles.section} aria-labelledby="converter-title">
      <div className={styles.card}>
        <h2 id="converter-title" className={styles.eyebrow}>
          {labels.eyebrow}
        </h2>

        <div className={styles.grid}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.amount}>
              <AmountInput
                label={labels.amount}
                value={amount}
                onChange={onAmountChange}
                error={errors.amount}
                placeholder={labels.amountPlaceholder}
                id="amount"
              />
            </div>

            <div className={styles.pair}>
              <CurrencySelect
                id="from"
                label={labels.from}
                value={from}
                options={currencies}
                onChange={onFromChange}
                disabled={currenciesUnavailable}
                error={errors.pair}
                showErrorMessage={false}
                describedBy={errors.pair ? 'pair-error' : undefined}
              />

              <div className={styles.swap}>
                <SwapButton onClick={onSwap} label={labels.swap} />
              </div>

              <CurrencySelect
                id="to"
                label={labels.to}
                value={to}
                options={currencies}
                onChange={onToChange}
                disabled={currenciesUnavailable}
                error={errors.pair}
                showErrorMessage={false}
                describedBy={errors.pair ? 'pair-error' : undefined}
              />
            </div>

            {errors.pair && (
              <p className={styles.pairError} id="pair-error" role="alert">
                <AlertCircle aria-hidden="true" />
                <span>{errors.pair}</span>
              </p>
            )}

            {currenciesStatus === 'error' && (
              <div className={styles.currenciesError} role="alert">
                <p className={styles.currenciesErrorText}>
                  <AlertCircle aria-hidden="true" />
                  <span>{labels.currenciesError}</span>
                </p>
                <Button variant="secondary" className={styles.retry} onClick={onRetryCurrencies}>
                  {labels.retry}
                </Button>
              </div>
            )}

            <Button type="submit" variant="primary" className={styles.convert}>
              {labels.convert}
            </Button>
          </form>

          <div className={styles.result} aria-live="polite">
            <ConversionResult
              amount={appliedAmount}
              converted={converted}
              rate={rate}
              rateDate={rateDate}
              from={from}
              to={to}
              status={status}
              language={language}
              labels={labels}
              onRetry={onRetry}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default CurrencyConverter;
