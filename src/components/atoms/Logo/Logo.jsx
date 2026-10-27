import styles from './Logo.module.css';
import { ArrowLeftRight } from 'lucide-react';

function Logo() {
  return (
    <div className={styles.logo}>
      <span className={styles.mark} aria-hidden="true">
        <ArrowLeftRight className={styles.icon} />
      </span>
      <span className={styles.text}>HERMES</span>
    </div>
  );
}

export default Logo;
