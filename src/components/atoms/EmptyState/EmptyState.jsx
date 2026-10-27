import styles from './EmptyState.module.css';
import { Search } from 'lucide-react';

function EmptyState({ message = 'Nenhum dado encontrado', description, action, compact = false }) {
  return (
    <div className={`${styles.state} ${compact ? styles.compact : ''}`} role="status">
      <Search className={styles.icon} aria-hidden="true" />
      <p className={styles.title}>{message}</p>
      {description && <p className={styles.description}>{description}</p>}
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}

export default EmptyState;
