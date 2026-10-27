import styles from './AmountInput.module.css';
import Label from '../../atoms/Label/Label';
import Input from '../../atoms/Input/Input';
import { AlertCircle } from 'lucide-react';

function AmountInput({ value, onChange, error, label = 'Valor', id = 'amount' }) {
  const errorId = `${id}-error`;

  return (
    <div className={styles.container}>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        value={value}
        onChange={onChange}
        error={Boolean(error)}
        inputMode="decimal"
        autoComplete="off"
        placeholder="0,00"
        aria-describedby={error ? errorId : undefined}
      />
      {error && (
        <p className={styles.errt} id={errorId} role="alert">
          <AlertCircle size={16} aria-hidden="true" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}

export default AmountInput;
