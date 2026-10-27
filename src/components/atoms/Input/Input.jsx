import styles from './Input.module.css';

function Input({ value, onChange, type = 'text', placeholder, disabled }) {
  return (
    <input
      type={type}
      className={styles.input}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
}

export default Input;
