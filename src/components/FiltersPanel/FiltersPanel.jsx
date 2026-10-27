import styles from './FiltersPanel.module.css';
import Label from '../atoms/Label/Label';
import Input from '../atoms/Input/Input';
import Button from '../atoms/Button/Button';

function FiltersPanel({ filters = {}, onChange, onClear, errors = {} }) {
  const handleChange = (field, value) => {
    onChange?.({ ...filters, [field]: value });
  };

  return (
    <div className={styles.panel}>
      <div className={styles.field}>
        <Label>Data inicial</Label>
        <Input type="date" value={filters.startDate || ''} onChange={(v) => handleChange('startDate', v)} />
      </div>
      <div className={styles.field}>
        <Label>Data final</Label>
        <Input type="date" value={filters.endDate || ''} onChange={(v) => handleChange('endDate', v)} />
      </div>
      <div className={styles.field}>
        <Label>Cotação mínima</Label>
        <Input value={filters.minRate || ''} onChange={(v) => handleChange('minRate', v)} />
      </div>
      <div className={styles.field}>
        <Label>Cotação máxima</Label>
        <Input value={filters.maxRate || ''} onChange={(v) => handleChange('maxRate', v)} />
      </div>
      <Button onClick={onClear}>Limpar filtros</Button>
      {errors.dates && <div className={styles.error}>{errors.dates}</div>}
      {errors.rate && <div className={styles.error}>{errors.rate}</div>}
    </div>
  );
}

export default FiltersPanel;
