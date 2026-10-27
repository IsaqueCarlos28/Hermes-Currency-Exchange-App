import styles from './RatesTableSection.module.css';
import FiltersPanel from '../FiltersPanel/FiltersPanel';
import TableSummary from '../TableSummary/TableSummary';
import ExportCsvButton from '../ExportCsvButton/ExportCsvButton';
import RatesTable from '../RatesTable/RatesTable';
import LoadingState from '../LoadingState/LoadingState';
import ErrorState from '../ErrorState/ErrorState';
import EmptyState from '../EmptyState/EmptyState';

function RatesTableSection({ rates = [], from, to, period, status, onRetry }) {
  const filters = {};
  const sort = { field: 'date', direction: 'desc' };

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Tabela de cotações</h2>
      <div className={styles.grid}>
        <div className={styles.filters}>
          <FiltersPanel filters={filters} onChange={() => {}} onClear={() => {}} errors={{}} />
        </div>
        <div className={styles.tableArea}>
          <div className={styles.actions}>
            <TableSummary filteredCount={rates.length} totalCount={rates.length} />
            <ExportCsvButton rows={rates} from={from} to={to} />
          </div>
          {status === 'loading' && <LoadingState message="Carregando tabela..." />}
          {status === 'error' && <ErrorState message="Não foi possível carregar os dados." onRetry={onRetry} />}
          {status === 'success' && rates.length === 0 && <EmptyState message="Nenhum dado para exibir." />}
          {status === 'success' && rates.length > 0 && <RatesTable rows={rates} sort={sort} onSortChange={() => {}} />}
        </div>
      </div>
    </section>
  );
}

export default RatesTableSection;
