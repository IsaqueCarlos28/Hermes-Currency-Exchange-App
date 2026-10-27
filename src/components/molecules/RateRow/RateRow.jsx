import styles from './RateRow.module.css';
import { formatDate, formatRate } from '../../../utils/formatters';

function RateRow({ date, from, to, rate, language = 'PT' }) {
  return (
    <tr>
      <td>{formatDate(date, language)}</td>
      <td>{from}</td>
      <td>{to}</td>
      <td className={styles.num}>{formatRate(rate, language, 4, 4)}</td>
    </tr>
  );
}

export default RateRow;
