import styles from './Input.module.css';

function Input({ value, onChange, type = 'text', placeholder, disabled, error, id, ...rest }) {
  const classes = [styles.input, error ? styles.error : '', disabled ? styles.disabled : '']
    .filter(Boolean)
    .join(' ');

  return (
    <input
      id={id}
      type={type}
      className={classes}
      value={value}
      onChange={(event) => onChange?.(event.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      aria-invalid={error ? 'true' : undefined}
      {...rest}
    />
  );
}

export default Input;
