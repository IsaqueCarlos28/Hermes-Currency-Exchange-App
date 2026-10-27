import styles from './Label.module.css';

function Label({ children }) {
  return <label className={styles.label}>{children}</label>;
}

export default Label;
