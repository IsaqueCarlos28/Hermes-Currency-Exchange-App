import styles from './TableSummary.module.css';

function TableSummary({ filteredCount = 0, totalCount = 0 }) {
  return <div className={styles.summary}>{filteredCount} de {totalCount} registros</div>;
}

export default TableSummary;
