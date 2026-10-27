import styles from './Select.module.css';
import { ChevronDown } from 'lucide-react';

function Select({ value, onChange, options = [], disabled, error, id, ...rest }) {
  const classes = [styles.select, error ? styles.error : '', disabled ? styles.disabled : '']
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.wrapper}>
      <select
        id={id}
        className={classes}
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        disabled={disabled}
        aria-invalid={error ? 'true' : undefined}
        {...rest}
      >
        {options.map((option) => {
          const optionValue = typeof option === 'string' ? option : option.value;
          const optionLabel = typeof option === 'string' ? option : option.label || option.value;
          return (
            <option key={optionValue} value={optionValue}>
              {optionLabel}
            </option>
          );
        })}
      </select>
      <ChevronDown className={styles.icon} aria-hidden="true" />
    </div>
  );
}

export default Select;
