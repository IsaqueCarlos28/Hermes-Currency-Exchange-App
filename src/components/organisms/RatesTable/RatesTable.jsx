import styles from './RatesTable.module.css';
import RateRow from '../../molecules/RateRow/RateRow';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { LABELS } from '../../../constants/i18n';

function RatesTable({
  rows = [],
  sort = { field: 'date', direction: 'desc' },
  onSortChange,
  language = 'PT',
  labels = LABELS.PT.table,
}) {
  const dateActive = sort?.field === 'date';
  const rateActive = sort?.field === 'rate';

  const ariaSort = (active) => {
    if (!active) return 'none';
    return sort?.direction === 'asc' ? 'ascending' : 'descending';
  };

  const nextDirectionLabel = (active) => {
    const isAscendingNext = active && sort?.direction === 'desc';
    return isAscendingNext ? labels.ascending : labels.descending;
  };

  const SortIcon = sort?.direction === 'asc' ? ArrowUp : ArrowDown;

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col" aria-sort={ariaSort(dateActive)}>
              <button
                type="button"
                className={`${styles.sort} ${dateActive ? styles.sortActive : ''}`}
                onClick={() => onSortChange?.('date')}
                aria-label={`${labels.sortByDate}, ${nextDirectionLabel(dateActive)}`}
              >
                {labels.date}
                {dateActive && <SortIcon size={16} aria-hidden="true" />}
              </button>
            </th>
            <th scope="col">{labels.origin}</th>
            <th scope="col">{labels.destination}</th>
            <th scope="col" aria-sort={ariaSort(rateActive)} className={styles.num}>
              <button
                type="button"
                className={`${styles.sort} ${rateActive ? styles.sortActive : ''}`}
                onClick={() => onSortChange?.('rate')}
                aria-label={`${labels.sortByRate}, ${nextDirectionLabel(rateActive)}`}
              >
                {labels.rate}
                {rateActive && <SortIcon size={16} aria-hidden="true" />}
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <RateRow
              key={`${row.date}-${row.rate}`}
              date={row.date}
              from={row.from}
              to={row.to}
              rate={row.rate}
              language={language}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RatesTable;
