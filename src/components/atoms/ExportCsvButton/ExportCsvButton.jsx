import styles from './ExportCsvButton.module.css';
import Button from '../Button/Button';
import { Download } from 'lucide-react';
import buildCsv from '../../../utils/buildCsv';
import downloadCsv from '../../../utils/downloadCsv';
import { formatDate, formatRate } from '../../../utils/formatters';
import { LABELS } from '../../../constants/i18n';

function ExportCsvButton({
  rows = [],
  from,
  to,
  disabled = false,
  language = 'PT',
  labels = LABELS.PT.table,
  className = '',
}) {
  const isDisabled = disabled || rows.length === 0;

  const handleClick = () => {
    if (isDisabled) return;

    const csv = buildCsv(
      rows.map((row) => [
        formatDate(row.date, language),
        row.from,
        row.to,
        formatRate(row.rate, language, 4, 4),
      ]),
      [labels.date, labels.origin, labels.destination, labels.rate],
    );

    downloadCsv(`hermes-${from}-${to}.csv`, `\uFEFF${csv}`);
  };

  return (
    <Button
      variant="secondary"
      onClick={handleClick}
      disabled={isDisabled}
      className={`${styles.button} ${className}`}
    >
      <Download size={20} aria-hidden="true" />
      {labels.exportCsv}
    </Button>
  );
}

export default ExportCsvButton;
