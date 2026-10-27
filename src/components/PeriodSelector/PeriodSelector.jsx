import styles from './PeriodSelector.module.css';

function PeriodSelector({ periods = [], value, onChange }) {
  return (
    <div className={styles.selector}>
      {periods.map((p) => {
        const val = typeof p === 'string' ? p : p.value;
        const label = typeof p === 'string' ? p : p.label || p.value;
        return (
          <button
            key={val}
            type="button"
            className={value === val ? styles.active : styles.button}
            onClick={() => onChange?.(val)}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

export default PeriodSelector;
