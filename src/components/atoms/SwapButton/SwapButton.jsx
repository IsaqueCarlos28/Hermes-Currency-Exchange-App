import styles from './SwapButton.module.css';
import Button from '../Button/Button';

function SwapButton({ onClick, disabled }) {
  return (
    <Button onClick={onClick} disabled={disabled} className={styles.button}>
      ⇄
    </Button>
  );
}

export default SwapButton;
