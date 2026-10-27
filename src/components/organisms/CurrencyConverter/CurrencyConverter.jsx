import styles from './CurrencyConverter.module.css';
import AmountInput from '../../molecules/AmountInput/AmountInput';
import CurrencySelect from '../../molecules/CurrencySelect/CurrencySelect';
import SwapButton from '../../atoms/SwapButton/SwapButton';
import ConversionResult from '../../molecules/ConversionResult/ConversionResult';

function CurrencyConverter({
  currencies = [],
  from,
  to,
  amount,
  rate,
  rateDate,
  status,
  onFromChange,
  onToChange,
  onAmountChange,
  onSwap,
  converted,
}) {
  return (
    <section className={styles.converter}>
      <div className={styles.row}>
        <CurrencySelect label="Moeda de origem" value={from} options={currencies} onChange={onFromChange} />
        <SwapButton onClick={onSwap} />
        <CurrencySelect label="Moeda de destino" value={to} options={currencies} onChange={onToChange} />
      </div>
      <div className={styles.amount}>
        <AmountInput label="Valor" value={amount} onChange={onAmountChange} />
      </div>
      <ConversionResult converted={converted} rate={rate} rateDate={rateDate} from={from} to={to} status={status} />
    </section>
  );
}

export default CurrencyConverter;
