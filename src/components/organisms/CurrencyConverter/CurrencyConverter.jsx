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
  from,
  to,
  amount,
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
  onRetry,
}) {
  return (
    <section className={styles.section} aria-labelledby="converter-title">
      <div className={styles.card}>
        <h2 id="converter-title" className={styles.eyebrow}>
          {labels.eyebrow}
        </h2>

        <div className={styles.grid}>
          <div className={styles.form}>
            <div className={styles.amount}>
              <AmountInput
                label={labels.amount}
                value={amount}
                onChange={onAmountChange}
                error={errors.amount}
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

            <Button variant="primary" className={styles.convert}>
              {labels.convert}
            </Button>
          </div>

          <div className={styles.result} aria-live="polite">
            <ConversionResult
              amount={amount}
              converted={converted}
              rate={rate}
              rateDate={rateDate}
              from={from}
              to={to}
              status={status}
              language={language}
              labels={labels}
              invalidAmount={Boolean(errors.amount)}
              onRetry={onRetry}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default CurrencyConverter;
