import styles from './LoadingState.module.css';

function LoadingState({ message = 'Carregando...' }) {
  return <div className={styles.loading}>{message}</div>;
}

export default LoadingState;
