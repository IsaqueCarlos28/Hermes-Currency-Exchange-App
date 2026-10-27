import styles from './SwapButton.module.css';

function SwapButton({ onClick, disabled }) {
  return (
    <button type="button" className={styles.button} onClick={onClick} disabled={disabled}>
      ⇄
    </button>
  );
}

export default SwapButton;
