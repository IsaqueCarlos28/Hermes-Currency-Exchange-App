import { describe, expect, it } from 'vitest';
import sortRates from '../sortRates';

const RATES = [
  { date: '2026-10-15', rate: 5.39 },
  { date: '2026-11-03', rate: 5.45 },
  { date: '2026-10-31', rate: 5.41 },
];

describe('sortRates', () => {
  it('sorts by date descending by default', () => {
    expect(sortRates(RATES).map((row) => row.date)).toEqual([
      '2026-11-03',
      '2026-10-31',
      '2026-10-15',
    ]);
  });

  it('sorts by date ascending', () => {
    expect(sortRates(RATES, { field: 'date', direction: 'asc' }).map((row) => row.date)).toEqual([
      '2026-10-15',
      '2026-10-31',
      '2026-11-03',
    ]);
  });

  it('sorts by rate ascending and descending', () => {
    expect(sortRates(RATES, { field: 'rate', direction: 'asc' }).map((row) => row.rate)).toEqual([
      5.39, 5.41, 5.45,
    ]);
    expect(sortRates(RATES, { field: 'rate', direction: 'desc' }).map((row) => row.rate)).toEqual([
      5.45, 5.41, 5.39,
    ]);
  });

  it('does not mutate the original array or objects', () => {
    const original = [...RATES];
    sortRates(RATES, { field: 'rate', direction: 'asc' });
    expect(RATES).toEqual(original);
  });

  it('falls back to date descending for missing sort options', () => {
    expect(sortRates(RATES, null).map((row) => row.date)).toEqual([
      '2026-11-03',
      '2026-10-31',
      '2026-10-15',
    ]);
  });
});
