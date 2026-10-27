import styles from './CurrencySelect.module.css';
import Label from '../../atoms/Label/Label';
import Select from '../../atoms/Select/Select';
import { AlertCircle } from 'lucide-react';

function CurrencySelect({
  label,
  value,
  options = [],
  onChange,
  disabled,
  error,
  showErrorMessage = true,
  describedBy,
  id,
}) {
  const errorId = id ? `${id}-error` : undefined;
  const hasMessage = Boolean(error) && showErrorMessage;
  const descriptionId = hasMessage ? errorId : describedBy;

  return (
    <div className={styles.container}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <Select
        id={id}
        value={value}
        onChange={onChange}
        options={options}
        disabled={disabled}
        error={Boolean(error)}
        aria-describedby={descriptionId}
      />
      {hasMessage && (
        <p className={styles.errt} id={errorId} role="alert">
          <AlertCircle aria-hidden="true" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}

export default CurrencySelect;
