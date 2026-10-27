import styles from './RatesTableSection.module.css';
import FiltersPanel from '../../molecules/FiltersPanel/FiltersPanel';
import TableSummary from '../../atoms/TableSummary/TableSummary';
import ExportCsvButton from '../../atoms/ExportCsvButton/ExportCsvButton';
import RatesTable from '../RatesTable/RatesTable';
import LoadingState from '../../atoms/LoadingState/LoadingState';
import ErrorState from '../../atoms/ErrorState/ErrorState';
import EmptyState from '../../atoms/EmptyState/EmptyState';
import Button from '../../atoms/Button/Button';
import useRateFilters from '../../../hooks/useRateFilters';
import { LABELS } from '../../../constants/i18n';

function RatesTableSection({
  rates = [],
  from,
  to,
  status = 'success',
  onRetry,
  language = 'PT',
  labels = LABELS.PT.table,
}) {
  const { filters, setFilters, errors, clearFilters, sort, toggleSort, filteredRows } =
    useRateFilters(rates, labels);

  const isEmpty = filteredRows.length === 0;

  const renderExport = (wrapperClass) => (
    <div className={wrapperClass}>
      <ExportCsvButton
        rows={filteredRows}
        from={from}
        to={to}
        language={language}
        labels={labels}
      />
      {isEmpty && <p className={styles.exportNote}>{labels.exportEmpty}</p>}
    </div>
  );

  return (
    <section className={styles.section} aria-labelledby="rates-table-title">
      <div className={styles.card}>
        <div className={styles.titleArea}>
          <h2 id="rates-table-title" className={styles.title}>
            {labels.title}
          </h2>
          <TableSummary
            filteredCount={filteredRows.length}
            totalCount={rates.length}
            format={labels.summary}
          />
        </div>

        {renderExport(styles.exportTop)}

        <div className={styles.filters}>
          <FiltersPanel
            filters={filters}
            onChange={setFilters}
            onClear={clearFilters}
            errors={errors}
            labels={labels}
          />
        </div>

        {renderExport(styles.exportBottom)}

        <div className={styles.tableArea}>
          {status === 'loading' && (
            <LoadingState variant="table" message={labels.loading} />
          )}

          {status === 'error' && (
            <ErrorState
              message={labels.error}
              description={labels.errorDescription}
              retryLabel={labels.retry || LABELS.PT.history.retry}
              onRetry={onRetry}
            />
          )}

          {status === 'success' && isEmpty && (
            <EmptyState
              compact
              message={labels.noResults}
              action={
                <Button variant="secondary" onClick={clearFilters}>
                  {labels.clear}
                </Button>
              }
            />
          )}

          {status === 'success' && !isEmpty && (
            <RatesTable
              rows={filteredRows}
              sort={sort}
              onSortChange={toggleSort}
              language={language}
              labels={labels}
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default RatesTableSection;
