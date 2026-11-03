import { describe, expect, it } from 'vitest';
import validateAmount from '../validateAmount';

describe('validateAmount', () => {
  it('accepts positive integers and decimals with comma or period', () => {
    expect(validateAmount('100')).toEqual({ valid: true, value: 100 });
    expect(validateAmount('10,5')).toEqual({ valid: true, value: 10.5 });
    expect(validateAmount('10.5')).toEqual({ valid: true, value: 10.5 });
    expect(validateAmount(' 42 ')).toEqual({ valid: true, value: 42 });
  });

  it('rejects empty values as required', () => {
    expect(validateAmount('')).toMatchObject({ valid: false, reason: 'required' });
    expect(validateAmount('   ')).toMatchObject({ valid: false, reason: 'required' });
    expect(validateAmount(null)).toMatchObject({ valid: false, reason: 'required' });
    expect(validateAmount(undefined)).toMatchObject({ valid: false, reason: 'required' });
  });

  it('rejects zero and negative values as required', () => {
    expect(validateAmount('0')).toMatchObject({ valid: false, reason: 'required' });
    expect(validateAmount('-5')).toMatchObject({ valid: false, reason: 'required' });
  });

  it('rejects non-numeric values as invalid', () => {
    expect(validateAmount('abc')).toMatchObject({ valid: false, reason: 'invalid' });
    expect(validateAmount('10,5,2')).toMatchObject({ valid: false, reason: 'invalid' });
  });
});
