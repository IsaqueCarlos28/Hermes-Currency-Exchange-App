import styles from './ErrorState.module.css';

function ErrorState({ message = 'Ocorreu um erro.', onRetry }) {
  return (
    <div className={styles.error}>
      <div>{message}</div>
      {onRetry && <button type="button" onClick={onRetry}>Tentar novamente</button>}
    </div>
  );
}

export default ErrorState;
