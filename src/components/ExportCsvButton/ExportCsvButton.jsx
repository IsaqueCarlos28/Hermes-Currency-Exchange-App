import styles from './ExportCsvButton.module.css';

function ExportCsvButton({ rows = [], from, to, disabled, labels }) {
  const handleClick = () => {
    // Placeholder - implement CSV generation later
  };

  return (
    <button type="button" className={styles.button} onClick={handleClick} disabled={disabled || rows.length === 0}>
      Exportar CSV
    </button>
  );
}

export default ExportCsvButton;
