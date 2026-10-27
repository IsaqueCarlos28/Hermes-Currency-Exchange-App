import styles from './RateRow.module.css';

function RateRow({ date, from, to, rate }) {
  return (
    <tr className={styles.row}>
      <td>{date}</td>
      <td>{from}</td>
      <td>{to}</td>
      <td>{rate}</td>
    </tr>
  );
}

export default RateRow;
