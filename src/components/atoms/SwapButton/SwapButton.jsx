import styles from './SwapButton.module.css';
import Button from '../Button/Button';
import { ArrowLeftRight } from 'lucide-react';

function SwapButton({ onClick, disabled, label = 'Trocar moedas' }) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={styles.button}
      variant="secondary"
      aria-label={label}
    >
      <ArrowLeftRight size={20} aria-hidden="true" />
    </Button>
  );
}

export default SwapButton;
