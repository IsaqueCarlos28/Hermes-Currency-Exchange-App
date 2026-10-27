import styles from './Button.module.css';

function Button({
  children,
  onClick,
  disabled = false,
  loading = false,
  type = 'button',
  className = '',
  variant = 'secondary',
  'aria-label': ariaLabel,
  ...rest
}) {
  const isDisabled = disabled || loading;
  const variantClass = isDisabled
    ? styles.disabled
    : variant === 'primary'
      ? styles.primary
      : styles.secondary;

  return (
    <button
      type={type}
      className={`${styles.button} ${variantClass} ${className}`}
      onClick={onClick}
      disabled={isDisabled}
      aria-label={ariaLabel}
      aria-busy={loading ? 'true' : undefined}
      {...rest}
    >
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      {children}
    </button>
  );
}

export default Button;
