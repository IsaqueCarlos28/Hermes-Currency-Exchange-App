import styles from './AmountInput.module.css';
import Label from '../atoms/Label/Label';
import Input from '../atoms/Input/Input';

function AmountInput({ value, onChange, error, label }) {
  return (
    <div className={styles.container}>
      {label && <Label>{label}</Label>}
      <Input value={value} onChange={onChange} />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}

export default AmountInput;
