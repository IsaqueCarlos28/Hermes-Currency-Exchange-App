import styles from './LoadingState.module.css';

const SKELETON_WIDTHS = ['40%', '100%', '100%', '100%', '70%'];

function LoadingState({ message = 'Carregando cotações...', variant = 'default' }) {
  if (variant === 'table') {
    return (
      <div className={styles.skeletonTable} role="status" aria-live="polite">
        <span className="sr-only">{message}</span>
        {SKELETON_WIDTHS.map((width, index) => (
          <span
            key={'skeleton-' + index}
            className={styles.skeletonRow}
            style={{ width }}
            aria-hidden="true"
          />
        ))}
      </div>
    );
  }

  return (
    <div className={styles.state} role="status" aria-live="polite">
      <span className={styles.spinner} aria-hidden="true" />
      <p className={styles.message}>{message}</p>
    </div>
  );
}

export default LoadingState;
