import styles from './PeriodSelector.module.css';

function PeriodSelector({ periods = [], value, onChange, label = 'Período' }) {
  return (
    <div className={styles.selector} role="group" aria-label={label}>
      {periods.map((period) => {
        const periodValue = typeof period === 'string' ? period : period.value;
        const periodLabel = typeof period === 'string' ? period : period.label || period.value;
        const isActive = value === periodValue;

        return (
          <button
            key={periodValue}
            type="button"
            className={isActive ? styles.active : styles.button}
            onClick={() => onChange?.(periodValue)}
            aria-pressed={isActive}
          >
            {periodLabel}
          </button>
        );
      })}
    </div>
  );
}

export default PeriodSelector;
