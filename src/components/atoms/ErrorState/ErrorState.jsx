import styles from './ErrorState.module.css';
import Button from '../Button/Button';
import { AlertCircle } from 'lucide-react';

function ErrorState({
  message = 'Não foi possível carregar as cotações.',
  description,
  retryLabel = 'Tentar novamente',
  onRetry,
}) {
  return (
    <div className={styles.state} role="alert">
      <AlertCircle className={styles.icon} aria-hidden="true" />
      <p className={styles.title}>{message}</p>
      {description && <p className={styles.description}>{description}</p>}
      {onRetry && (
        <Button variant="primary" className={styles.retry} onClick={onRetry}>
          {retryLabel}
        </Button>
      )}
    </div>
  );
}

export default ErrorState;
