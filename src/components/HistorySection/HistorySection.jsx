import styles from './HistorySection.module.css';
import PeriodSelector from '../PeriodSelector/PeriodSelector';
import RateChart from '../RateChart/RateChart';
import LoadingState from '../LoadingState/LoadingState';
import ErrorState from '../ErrorState/ErrorState';
import EmptyState from '../EmptyState/EmptyState';

function HistorySection({ period, onPeriodChange, rates = [], from, to, status, onRetry, periods }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Histórico e gráfico</h2>
      <PeriodSelector periods={periods} value={period} onChange={onPeriodChange} />
      <div className={styles.content}>
        {status === 'loading' && <LoadingState message="Carregando histórico..." />}
        {status === 'error' && <ErrorState message="Não foi possível carregar as cotações." onRetry={onRetry} />}
        {status === 'success' && rates.length === 0 && <EmptyState message="Nenhum dado encontrado para este período." />}
        {status === 'success' && rates.length > 0 && <RateChart data={rates} from={from} to={to} />}
      </div>
    </section>
  );
}

export default HistorySection;
