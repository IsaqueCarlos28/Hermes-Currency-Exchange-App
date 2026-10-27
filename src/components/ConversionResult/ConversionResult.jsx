import styles from './ConversionResult.module.css';

function ConversionResult({ converted, rate, rateDate, from, to, status }) {
  return (
    <div className={styles.container}>
      <div className={styles.converted}>
        {converted !== undefined && converted !== null ? `${converted} ${to}` : (rate ? `-- ${to}` : null)}
      </div>
      <div className={styles.details}>
        {rate !== undefined && rate !== null && from && to ? `1 ${from} = ${rate} ${to}` : null}
        {rateDate ? ` • Cotação de ${rateDate}` : null}
        {status && status !== 'success' ? ` • ${status}` : null}
      </div>
    </div>
  );
}

export default ConversionResult;
