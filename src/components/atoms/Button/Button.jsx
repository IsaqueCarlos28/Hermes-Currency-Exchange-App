import styles from './Button.module.css';

function Button({ children, onClick, disabled, type = 'button', className = '' }) {
  return (
    <button type={type} className={`${styles.button} ${className}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
