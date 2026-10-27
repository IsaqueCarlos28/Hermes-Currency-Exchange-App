import styles from './RatesTable.module.css';
import RateRow from '../RateRow/RateRow';

function RatesTable({ rows = [], sort, onSortChange }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th onClick={() => onSortChange?.({ field: 'date', direction: sort?.direction === 'asc' ? 'desc' : 'asc' })}>Data</th>
          <th>Origem</th>
          <th>Destino</th>
          <th onClick={() => onSortChange?.({ field: 'rate', direction: sort?.direction === 'asc' ? 'desc' : 'asc' })}>Cotação</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, idx) => (
          <RateRow key={idx} date={row.date} from={row.from} to={row.to} rate={row.rate} />
        ))}
      </tbody>
    </table>
  );
}

export default RatesTable;
