import styles from './TableSummary.module.css';
import { LABELS } from '../../../constants/i18n';

function TableSummary({ filteredCount = 0, totalCount = 0, format = LABELS.PT.table.summary }) {
  return <p className={styles.summary}>{format(filteredCount, totalCount)}</p>;
}

export default TableSummary;
