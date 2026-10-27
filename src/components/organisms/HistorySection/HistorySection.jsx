import { useMemo } from 'react';
import styles from './HistorySection.module.css';
import PeriodSelector from '../../molecules/PeriodSelector/PeriodSelector';
import RateChart from '../../molecules/RateChart/RateChart';
import LoadingState from '../../atoms/LoadingState/LoadingState';
import ErrorState from '../../atoms/ErrorState/ErrorState';
import EmptyState from '../../atoms/EmptyState/EmptyState';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { formatPercent } from '../../../utils/formatters';
import { LABELS } from '../../../constants/i18n';

function HistorySection({
  period,
  onPeriodChange,
  rates = [],
  from,
  to,
  status = 'success',
  onRetry,
  periods = [],
  language = 'PT',
  labels = LABELS.PT.history,
}) {
  const variation = useMemo(() => {
    if (rates.length < 2) return null;
    const sorted = [...rates].sort((a, b) => String(a.date).localeCompare(String(b.date)));
    const first = Number(sorted[0].rate);
    const last = Number(sorted[sorted.length - 1].rate);
    if (!Number.isFinite(first) || !Number.isFinite(last) || first === 0) return null;
    return ((last - first) / first) * 100;
  }, [rates]);

  const periodText = labels.periods[period] || labels.periods['30D'];
  const isPositive = variation === null || variation >= 0;
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  return (
    <section className={styles.section} aria-labelledby="history-title">
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.titleGroup}>
            <h2 id="history-title" className={styles.title}>
              {labels.title(from, to)}
            </h2>

            {variation !== null && (
              <p className={styles.variation}>
                <span
                  className={`${styles.variationValue} ${isPositive ? styles.up : styles.down}`}
                >
                  <TrendIcon className={styles.variationIcon} aria-hidden="true" />
                  {formatPercent(variation, language)}
                </span>
                <span>
                  {labels.last} {periodText}
                </span>
              </p>
            )}
          </div>

          <PeriodSelector
            periods={periods}
            value={period}
            onChange={onPeriodChange}
            label={labels.periodLabel}
          />
        </div>

        {status === 'loading' && <LoadingState message={labels.loading} />}

        {status === 'error' && (
          <ErrorState
            message={labels.error}
            description={labels.errorDescription}
            retryLabel={labels.retry}
            onRetry={onRetry}
          />
        )}

        {status === 'success' && rates.length === 0 && (
          <EmptyState message={labels.empty} description={labels.emptyDescription} />
        )}

        {status === 'success' && rates.length > 0 && (
          <RateChart
            data={rates}
            from={from}
            to={to}
            language={language}
            labels={labels}
          />
        )}
      </div>
    </section>
  );
}

export default HistorySection;
