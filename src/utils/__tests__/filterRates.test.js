import { describe, expect, it } from 'vitest';
import { LABELS } from '../../constants/i18n';
import filterRates, {
  EMPTY_FILTERS,
  parseDateInput,
  parseRateInput,
  validateFilters,
} from '../filterRates';

const RATES = [
  { date: '2026-10-01', rate: 5.36 },
  { date: '2026-10-15', rate: 5.39 },
  { date: '2026-10-31', rate: 5.41 },
  { date: '2026-11-03', rate: 5.45 },
];

describe('parseDateInput', () => {
  it('parses Brazilian and Spanish dates as dd/mm/yyyy', () => {
    expect(parseDateInput('03/11/2026', 'PT')).toBe('2026-11-03');
    expect(parseDateInput('03/11/2026', 'ES')).toBe('2026-11-03');
  });

  it('parses English dates as mm/dd/yyyy', () => {
    expect(parseDateInput('11/03/2026', 'EN')).toBe('2026-11-03');
  });

  it('accepts ISO dates for every language', () => {
    expect(parseDateInput('2026-11-03', 'PT')).toBe('2026-11-03');
    expect(parseDateInput('2026-11-03', 'EN')).toBe('2026-11-03');
    expect(parseDateInput('2026-11-03', 'ES')).toBe('2026-11-03');
  });

  it('accepts leap-year dates', () => {
    expect(parseDateInput('29/02/2024', 'PT')).toBe('2024-02-29');
    expect(parseDateInput('02/29/2024', 'EN')).toBe('2024-02-29');
  });

  it('rejects impossible calendar dates', () => {
    expect(parseDateInput('31/02/2026', 'PT')).toBeNull();
    expect(parseDateInput('29/02/2025', 'PT')).toBeNull();
    expect(parseDateInput('02/30/2026', 'EN')).toBeNull();
    expect(parseDateInput('00/01/2026', 'PT')).toBeNull();
  });

  it('rejects malformed or empty values', () => {
    expect(parseDateInput('')).toBeNull();
    expect(parseDateInput('2026-11-3')).toBeNull();
    expect(parseDateInput('03-11-2026')).toBeNull();
    expect(parseDateInput('texto')).toBeNull();
  });
});

describe('parseRateInput', () => {
  it('accepts comma and period decimals', () => {
    expect(parseRateInput('5,35')).toBe(5.35);
    expect(parseRateInput('5.35')).toBe(5.35);
  });

  it('returns null for empty or invalid values', () => {
    expect(parseRateInput('')).toBeNull();
    expect(parseRateInput(null)).toBeNull();
    expect(parseRateInput(undefined)).toBeNull();
    expect(parseRateInput('abc')).toBeNull();
  });
});

describe('filterRates', () => {
  it('returns all records when filters are empty', () => {
    expect(filterRates(RATES, EMPTY_FILTERS, 'PT')).toHaveLength(RATES.length);
  });

  it('applies inclusive date boundaries', () => {
    const result = filterRates(
      RATES,
      { startDate: '15/10/2026', endDate: '31/10/2026' },
      'PT',
    );
    expect(result.map((row) => row.date)).toEqual(['2026-10-15', '2026-10-31']);
  });

  it('interprets date filters according to the selected language', () => {
    const result = filterRates(RATES, { startDate: '11/03/2026' }, 'EN');
    expect(result.map((row) => row.date)).toEqual(['2026-11-03']);
  });

  it('applies inclusive rate boundaries', () => {
    const result = filterRates(RATES, { minRate: '5,39', maxRate: '5,41' }, 'PT');
    expect(result.map((row) => row.rate)).toEqual([5.39, 5.41]);
  });

  it('combines date and rate filters with AND logic', () => {
    const result = filterRates(
      RATES,
      { startDate: '01/10/2026', endDate: '31/10/2026', minRate: '5,40' },
      'PT',
    );
    expect(result.map((row) => row.date)).toEqual(['2026-10-31']);
  });

  it('does not apply an invalid date range', () => {
    const result = filterRates(
      RATES,
      { startDate: '31/10/2026', endDate: '01/10/2026' },
      'PT',
    );
    expect(result).toHaveLength(RATES.length);
  });

  it('does not apply an invalid rate range', () => {
    const result = filterRates(RATES, { minRate: '6', maxRate: '5' }, 'PT');
    expect(result).toHaveLength(RATES.length);
  });

  it('keeps valid individual filters when another range is invalid', () => {
    const result = filterRates(
      RATES,
      { startDate: '31/10/2026', endDate: '01/10/2026', minRate: '5,44' },
      'PT',
    );
    expect(result.map((row) => row.date)).toEqual(['2026-11-03']);
  });

  it('ignores unparseable individual dates without hiding the dataset', () => {
    const result = filterRates(RATES, { startDate: '31/02/2026' }, 'PT');
    expect(result).toHaveLength(RATES.length);
  });
});

describe('validateFilters', () => {
  it('returns no errors for valid or empty filters', () => {
    expect(validateFilters(EMPTY_FILTERS, undefined, 'PT')).toEqual({});
    expect(
      validateFilters(
        { startDate: '01/10/2026', endDate: '31/10/2026', minRate: '5', maxRate: '6' },
        undefined,
        'PT',
      ),
    ).toEqual({});
  });

  it('reports invalid date and rate formats', () => {
    const errors = validateFilters(
      { startDate: '31/02/2026', endDate: '02/30/2026', minRate: 'abc', maxRate: '10,5,2' },
      undefined,
      'PT',
    );
    expect(errors.startDate).toBe('Use o formato dd/mm/aaaa.');
    expect(errors.endDate).toBe('Use o formato dd/mm/aaaa.');
    expect(errors.minRate).toBe('Digite um número válido.');
    expect(errors.maxRate).toBe('Digite um número válido.');
  });

  it('uses the English date message when the language is EN', () => {
    const errors = validateFilters(
      { startDate: '31/02/2026' },
      LABELS.EN.table,
      'EN',
    );
    expect(errors.startDate).toBe('Use the mm/dd/yyyy format.');
  });

  it('reports inverted date and rate ranges', () => {
    const errors = validateFilters(
      { startDate: '31/10/2026', endDate: '01/10/2026', minRate: '6', maxRate: '5' },
      undefined,
      'PT',
    );
    expect(errors.range).toBe('A data inicial deve ser anterior à final.');
    expect(errors.rates).toBe('A cotação mínima deve ser menor que a máxima.');
  });
});
