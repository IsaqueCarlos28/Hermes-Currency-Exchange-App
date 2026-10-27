import styles from './FiltersPanel.module.css';

function FiltersPanel({ filters = {}, onChange, onClear, errors = {} }) {
  const handleChange = (field, value) => {
    onChange?.({ ...filters, [field]: value });
  };

  return (
    <div className={styles.panel}>
      <div className={styles.field}>
        <label>Data inicial</label>
        <input type="date" value={filters.startDate || ''} onChange={(e) => handleChange('startDate', e.target.value)} />
      </div>
      <div className={styles.field}>
        <label>Data final</label>
        <input type="date" value={filters.endDate || ''} onChange={(e) => handleChange('endDate', e.target.value)} />
      </div>
      <div className={styles.field}>
        <label>Cotação mínima</label>
        <input value={filters.minRate || ''} onChange={(e) => handleChange('minRate', e.target.value)} />
      </div>
      <div className={styles.field}>
        <label>Cotação máxima</label>
        <input value={filters.maxRate || ''} onChange={(e) => handleChange('maxRate', e.target.value)} />
      </div>
      <button type="button" onClick={onClear}>Limpar filtros</button>
      {errors.dates && <div className={styles.error}>{errors.dates}</div>}
      {errors.rate && <div className={styles.error}>{errors.rate}</div>}
    </div>
  );
}

export default FiltersPanel;
