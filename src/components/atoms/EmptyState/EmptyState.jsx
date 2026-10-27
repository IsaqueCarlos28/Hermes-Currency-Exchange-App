import styles from './EmptyState.module.css';

function EmptyState({ message = 'Nenhum dado encontrado', action }) {
  return (
    <div className={styles.empty}>
      <div>{message}</div>
      {action}
    </div>
  );
}

export default EmptyState;
