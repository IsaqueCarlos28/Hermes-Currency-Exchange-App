import styles from './ExportCsvButton.module.css';
import Button from '../atoms/Button/Button';

function ExportCsvButton({ rows = [], from, to, disabled, labels }) {
  const handleClick = () => {
    // Placeholder - implement CSV generation later
  };

  return (
    <Button onClick={handleClick} disabled={disabled || rows.length === 0} className={styles.button}>
      Exportar CSV
    </Button>
  );
}

export default ExportCsvButton;
