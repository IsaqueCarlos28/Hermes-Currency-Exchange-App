import { describe, expect, it } from 'vitest';
import convertAmount from '../convertAmount';

describe('convertAmount', () => {
  it('converts a positive amount using the rate', () => {
    expect(convertAmount(100, 5.4218)).toBeCloseTo(542.18, 2);
  });

  it('accepts comma and period as decimal separators', () => {
    expect(convertAmount('10,5', 2)).toBeCloseTo(21, 6);
    expect(convertAmount('10.5', 2)).toBeCloseTo(21, 6);
  });

  it('accepts numeric strings for the rate', () => {
    expect(convertAmount('100', '0.5')).toBe(50);
  });

  it('returns zero when the amount is zero', () => {
    expect(convertAmount(0, 5)).toBe(0);
  });

  it('returns null for empty or missing amounts', () => {
    expect(convertAmount('', 5)).toBeNull();
    expect(convertAmount('   ', 5)).toBeNull();
    expect(convertAmount(null, 5)).toBeNull();
    expect(convertAmount(undefined, 5)).toBeNull();
  });

  it('returns null for invalid amounts', () => {
    expect(convertAmount('abc', 5)).toBeNull();
    expect(convertAmount('10,5,2', 5)).toBeNull();
  });

  it('returns null for invalid or missing rates', () => {
    expect(convertAmount(100, null)).toBeNull();
    expect(convertAmount(100, undefined)).toBeNull();
    expect(convertAmount(100, '')).toBeNull();
    expect(convertAmount(100, '   ')).toBeNull();
    expect(convertAmount(100, 'abc')).toBeNull();
    expect(convertAmount(100, Infinity)).toBeNull();
  });
});
