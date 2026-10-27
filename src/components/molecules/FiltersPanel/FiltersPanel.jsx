import styles from './FiltersPanel.module.css';
import Label from '../../atoms/Label/Label';
import Input from '../../atoms/Input/Input';
import Button from '../../atoms/Button/Button';
import { AlertCircle } from 'lucide-react';
import { LABELS } from '../../../constants/i18n';

function FiltersPanel({ filters = {}, onChange, onClear, errors = {}, labels = LABELS.PT.table }) {
  const update = (field, value) => onChange?.({ ...filters, [field]: value });

  const fieldProps = (field, { placeholder, inputMode }) => ({
    id: `filter-${field}`,
    placeholder,
    inputMode,
    value: filters[field] || '',
    onChange: (value) => update(field, value),
    error: Boolean(errors[field]),
    'aria-describedby': errors[field] ? `filter-${field}-error` : undefined,
  });

  const renderError = (field) =>
    errors[field] ? (
      <p className={styles.errt} id={`filter-${field}-error`} role="alert">
        <AlertCircle aria-hidden="true" />
        <span>{errors[field]}</span>
      </p>
    ) : null;

  return (
    <div className={styles.panel}>
      <h3 className={styles.eyebrow}>{labels.filters}</h3>

      <div className={styles.grid}>
        <div>
          <Label htmlFor="filter-startDate">{labels.startDate}</Label>
          <Input
            {...fieldProps('startDate', {
              placeholder: labels.datePlaceholder,
              inputMode: 'numeric',
            })}
          />
          {renderError('startDate')}
        </div>

        <div>
          <Label htmlFor="filter-endDate">{labels.endDate}</Label>
          <Input
            {...fieldProps('endDate', {
              placeholder: labels.datePlaceholder,
              inputMode: 'numeric',
            })}
          />
          {renderError('endDate')}
        </div>

        <div>
          <Label htmlFor="filter-minRate">{labels.minRate}</Label>
          <Input
            {...fieldProps('minRate', {
              placeholder: labels.minPlaceholder,
              inputMode: 'decimal',
            })}
          />
          {renderError('minRate')}
        </div>

        <div>
          <Label htmlFor="filter-maxRate">{labels.maxRate}</Label>
          <Input
            {...fieldProps('maxRate', {
              placeholder: labels.maxPlaceholder,
              inputMode: 'decimal',
            })}
          />
          {renderError('maxRate')}
        </div>

        <Button variant="secondary" onClick={onClear} className={styles.clear}>
          {labels.clear}
        </Button>
      </div>

      {errors.range && (
        <p className={styles.errt} role="alert">
          <AlertCircle aria-hidden="true" />
          <span>{errors.range}</span>
        </p>
      )}
      {errors.rates && (
        <p className={styles.errt} role="alert">
          <AlertCircle aria-hidden="true" />
          <span>{errors.rates}</span>
        </p>
      )}
    </div>
  );
}

export default FiltersPanel;
