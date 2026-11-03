import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import useRateFilters from '../useRateFilters';
import { LABELS } from '../../constants/i18n';

const RATES = [
  { date: '2026-10-15', rate: 5.39 },
  { date: '2026-11-03', rate: 5.45 },
  { date: '2026-10-31', rate: 5.41 },
];

function setup(initialProps = {}) {
  return renderHook(
    ({ rates = RATES, language = 'PT', resetKey = '' }) =>
      useRateFilters(rates, LABELS[language].table, language, resetKey),
    { initialProps },
  );
}

describe('useRateFilters', () => {
  it('starts with no filters, date-descending sort and the full dataset', () => {
    const { result } = setup();

    expect(result.current.filters).toEqual({
      startDate: '',
      endDate: '',
      minRate: '',
      maxRate: '',
    });
    expect(result.current.sort).toEqual({ field: 'date', direction: 'desc' });
    expect(result.current.filteredRows.map((row) => row.date)).toEqual([
      '2026-11-03',
      '2026-10-31',
      '2026-10-15',
    ]);
    expect(result.current.errors).toEqual({});
  });

  it('filters and reports validation errors', () => {
    const { result } = setup();

    act(() => result.current.setFilters({ startDate: '31/02/2026', minRate: '6', maxRate: '5' }));

    expect(result.current.filteredRows).toHaveLength(3);
    expect(result.current.errors.startDate).toBe('Use o formato dd/mm/aaaa.');
    expect(result.current.errors.rates).toBe('A cotação mínima deve ser menor que a máxima.');
    expect(result.current.hasFilters).toBe(true);
  });

  it('interprets dates according to the interface language', () => {
    const { result } = setup({ language: 'EN' });

    act(() => result.current.setFilters({ startDate: '11/03/2026' }));

    expect(result.current.filteredRows.map((row) => row.date)).toEqual(['2026-11-03']);
    expect(result.current.errors).toEqual({});
  });

  it('toggles sorting by date and rate', () => {
    const { result } = setup();

    act(() => result.current.toggleSort('date'));
    expect(result.current.sort).toEqual({ field: 'date', direction: 'asc' });

    act(() => result.current.toggleSort('rate'));
    expect(result.current.sort).toEqual({ field: 'rate', direction: 'desc' });

    act(() => result.current.toggleSort('rate'));
    expect(result.current.sort).toEqual({ field: 'rate', direction: 'asc' });
    expect(result.current.filteredRows.map((row) => row.rate)).toEqual([5.39, 5.41, 5.45]);
  });

  it('clears all filters', () => {
    const { result } = setup();

    act(() => result.current.setFilters({ startDate: '01/01/2026', minRate: '5' }));
    act(() => result.current.clearFilters());

    expect(result.current.filters).toEqual({
      startDate: '',
      endDate: '',
      minRate: '',
      maxRate: '',
    });
    expect(result.current.hasFilters).toBe(false);
  });

  it('resets filters when the reset key changes', () => {
    const { result, rerender } = setup({ resetKey: 'USD|BRL|30D' });

    act(() => result.current.setFilters({ minRate: '5,44' }));
    expect(result.current.filteredRows).toHaveLength(1);

    rerender({ resetKey: 'USD|BRL|7D' });

    expect(result.current.filters.minRate).toBe('');
    expect(result.current.filteredRows).toHaveLength(3);
  });
});
