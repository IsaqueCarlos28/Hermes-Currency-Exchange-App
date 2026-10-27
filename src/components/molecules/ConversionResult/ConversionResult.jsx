import styles from './ConversionResult.module.css';
import Button from '../../atoms/Button/Button';
import { AlertCircle, ArrowDown } from 'lucide-react';
import { formatCurrency, formatDate, formatRate } from '../../../utils/formatters';
import { LABELS } from '../../../constants/i18n';

function ConversionResult({
  converted,
  rate,
  rateDate,
  from,
  to,
  status = 'success',
  amount,
  language = 'PT',
  labels = LABELS.PT.converter,
  invalidAmount = false,
  onRetry,
}) {
  const hasValue =
    converted !== undefined && converted !== null && !Number.isNaN(Number(converted));
  const hasRate = rate !== undefined && rate !== null && from && to && from !== to;
  const amountLabel = !invalidAmount && amount ? `${amount} ${from}` : `-- ${from}`;

  if (status === 'loading') {
    return (
      <div className={styles.container} role="status" aria-live="polite">
        <span className={styles.eyebrow}>{labels.converted}</span>
        {from && <span className={styles.skeletonAmount} aria-hidden="true" />}
        <span className={styles.skeletonValue} aria-hidden="true" />
        <span className={styles.skeletonLine} aria-hidden="true" />
        <span className="sr-only">{labels.loading}</span>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className={`${styles.container} ${styles.errorState}`} role="alert">
        <AlertCircle className={styles.errorIcon} aria-hidden="true" />
        <p className={styles.errorTitle}>{labels.apiError}</p>
        {onRetry && (
          <Button variant="primary" className={styles.retry} onClick={onRetry}>
            {labels.retry}
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <span className={styles.eyebrow}>{labels.converted}</span>

      {from && <p className={styles.from}>{amountLabel}</p>}

      <ArrowDown className={styles.arrow} size={20} aria-hidden="true" />

      <p className={styles.to}>{hasValue ? formatCurrency(converted, to, language) : '--'}</p>

      <div className={styles.details}>
        {hasRate && (
          <span className={styles.detailLine}>
            1 {from} = {formatRate(rate, language)} {to}
          </span>
        )}
        {rateDate && (
          <span className={styles.detailLine}>
            {labels.quote} {formatDate(rateDate, language)}
          </span>
        )}
      </div>
    </div>
  );
}

export default ConversionResult;
