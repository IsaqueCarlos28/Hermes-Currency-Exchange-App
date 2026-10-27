import styles from './CurrencySelect.module.css';
import Label from '../atoms/Label/Label';
import Select from '../atoms/Select/Select';

function CurrencySelect({ label, value, options = [], onChange, disabled }) {
  return (
    <div className={styles.container}>
      {label && <Label>{label}</Label>}
      <Select value={value} onChange={onChange} options={options} disabled={disabled} />
    </div>
  );
}

export default CurrencySelect;
