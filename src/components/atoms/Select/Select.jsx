import styles from './Select.module.css';

function Select({ value, onChange, options = [], disabled }) {
  return (
    <select className={styles.select} value={value} onChange={(e) => onChange?.(e.target.value)} disabled={disabled}>
      {options.map((opt) => {
        const val = typeof opt === 'string' ? opt : opt.value;
        const text = typeof opt === 'string' ? opt : opt.label || opt.value;
        return (
          <option key={val} value={val}>
            {text}
          </option>
        );
      })}
    </select>
  );
}

export default Select;
