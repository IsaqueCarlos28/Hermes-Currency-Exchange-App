import styles from './Label.module.css';

function Label({ children, htmlFor }) {
  return (
    <label className={styles.label} htmlFor={htmlFor}>
      {children}
    </label>
  );
}

export default Label;
