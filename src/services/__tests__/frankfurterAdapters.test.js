import { describe, expect, it } from 'vitest';
import {
  normalizeCurrencies,
  normalizeHistoricalRates,
  normalizeLatestRate,
} from '../frankfurterAdapters';

describe('normalizeCurrencies', () => {
  it('extracts, deduplicates, and sorts ISO codes', () => {
    const result = normalizeCurrencies([
      { iso_code: 'USD', name: 'United States Dollar' },
      { iso_code: 'BRL', name: 'Brazilian Real' },
      { iso_code: 'USD', name: 'Duplicate' },
      { iso_code: 'EUR', name: 'Euro' },
    ]);

    expect(result).toEqual(['BRL', 'EUR', 'USD']);
  });

  it('ignores invalid entries', () => {
    const result = normalizeCurrencies([
      { iso_code: 'USD' },
      { iso_code: '' },
      { iso_code: '   ' },
      { iso_code: 123 },
      null,
      { name: 'Missing code' },
    ]);

    expect(result).toEqual(['USD']);
  });

  it('returns an empty array for non-array input', () => {
    expect(normalizeCurrencies(null)).toEqual([]);
    expect(normalizeCurrencies(undefined)).toEqual([]);
    expect(normalizeCurrencies({})).toEqual([]);
  });
});

describe('normalizeLatestRate', () => {
  it('normalizes numeric and string rates', () => {
    expect(normalizeLatestRate({ rate: 5.4515, date: '2026-11-03' })).toEqual({
      rate: 5.4515,
      date: '2026-11-03',
    });
    expect(normalizeLatestRate({ rate: '0.18344', date: '2026-11-03' })).toEqual({
      rate: 0.18344,
      date: '2026-11-03',
    });
  });

  it('rejects incomplete or invalid payloads', () => {
    expect(normalizeLatestRate(null)).toBeNull();
    expect(normalizeLatestRate({ date: '2026-11-03' })).toBeNull();
    expect(normalizeLatestRate({ rate: 5.4515 })).toBeNull();
    expect(normalizeLatestRate({ rate: 'abc', date: '2026-11-03' })).toBeNull();
  });
});

describe('normalizeHistoricalRates', () => {
  it('normalizes and sorts rates by date', () => {
    const result = normalizeHistoricalRates([
      { date: '2026-11-03', base: 'USD', quote: 'BRL', rate: 5.4515 },
      { date: '2026-11-01', base: 'USD', quote: 'BRL', rate: 5.4079 },
      { date: '2026-11-02', base: 'USD', quote: 'BRL', rate: 5.4277 },
    ]);

    expect(result).toEqual([
      { date: '2026-11-01', rate: 5.4079 },
      { date: '2026-11-02', rate: 5.4277 },
      { date: '2026-11-03', rate: 5.4515 },
    ]);
  });

  it('keeps one record per date', () => {
    const result = normalizeHistoricalRates([
      { date: '2026-11-03', rate: 5.4 },
      { date: '2026-11-03', rate: 5.5 },
    ]);

    expect(result).toEqual([{ date: '2026-11-03', rate: 5.5 }]);
  });

  it('ignores invalid entries', () => {
    const result = normalizeHistoricalRates([
      { date: '2026-11-03', rate: 5.4515 },
      { date: '', rate: 5.4 },
      { date: '2026-11-02', rate: 'abc' },
      null,
    ]);

    expect(result).toEqual([{ date: '2026-11-03', rate: 5.4515 }]);
  });

  it('returns an empty array for non-array input', () => {
    expect(normalizeHistoricalRates(null)).toEqual([]);
    expect(normalizeHistoricalRates({})).toEqual([]);
  });
});
