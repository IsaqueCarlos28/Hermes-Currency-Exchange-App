import styles from './AmountInput.module.css';

function AmountInput({ value, onChange, error, label }) {
  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        className={styles.input}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}

export default AmountInput;
