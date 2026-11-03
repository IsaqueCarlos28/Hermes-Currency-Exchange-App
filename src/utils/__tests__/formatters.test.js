import { describe, expect, it } from 'vitest';
import {
  formatDate,
  formatNumber,
  formatPercent,
  formatRate,
  formatShortDate,
} from '../formatters';

describe('formatters', () => {
  it('formats ISO dates without timezone day shifts', () => {
    expect(formatDate('2026-11-03', 'PT')).toBe('03/11/2026');
    expect(formatDate('2026-11-03', 'EN')).toBe('11/03/2026');
    expect(formatDate('2026-11-03', 'ES')).toBe('03/11/2026');
  });

  it('ignores a time component when formatting dates', () => {
    expect(formatDate('2026-11-03T23:30:00Z', 'PT')).toBe('03/11/2026');
  });

  it('formats short dates by language', () => {
    expect(formatShortDate('2026-11-03', 'PT')).toBe('03/11');
    expect(formatShortDate('2026-11-03', 'EN')).toBe('11/03');
  });

  it('returns the original value for unparseable dates', () => {
    expect(formatDate('not-a-date', 'PT')).toBe('not-a-date');
  });

  it('formats numbers according to the locale', () => {
    expect(formatNumber(1234.5, 'PT')).toBe('1.234,50');
    expect(formatNumber(1234.5, 'EN')).toBe('1,234.50');
  });

  it('formats rates with four to six decimal places', () => {
    expect(formatRate(5.4515, 'PT')).toBe('5,4515');
    expect(formatRate(0.18344, 'EN')).toBe('0.18344');
  });

  it('formats signed percentages', () => {
    expect(formatPercent(4.54, 'PT')).toBe('+4,54%');
    expect(formatPercent(-1.25, 'PT')).toBe('−1,25%');
  });

  it('returns an empty string for invalid numbers', () => {
    expect(formatNumber('abc', 'PT')).toBe('');
    expect(formatRate(undefined, 'PT')).toBe('');
    expect(formatPercent('abc', 'PT')).toBe('');
  });
});
