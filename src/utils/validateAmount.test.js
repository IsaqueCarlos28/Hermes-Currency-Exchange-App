import { describe, expect, it } from 'vitest';
import validateAmount, { DEFAULT_MESSAGES } from './validateAmount';

describe('validateAmount', () => {
  it('aceita números inteiros e decimais', () => {
    expect(validateAmount('100')).toEqual({ valid: true, value: 100 });
    expect(validateAmount('1.5')).toEqual({ valid: true, value: 1.5 });
    expect(validateAmount(2)).toEqual({ valid: true, value: 2 });
  });

  it('aceita vírgula como separador decimal', () => {
    expect(validateAmount('1,5')).toEqual({ valid: true, value: 1.5 });
    expect(validateAmount('5,4218')).toEqual({ valid: true, value: 5.4218 });
  });

  it('rejeita campo vazio, apenas espaços, nulo e indefinido', () => {
    expect(validateAmount('')).toEqual({ valid: false, error: DEFAULT_MESSAGES.required });
    expect(validateAmount('   ')).toEqual({ valid: false, error: DEFAULT_MESSAGES.required });
    expect(validateAmount(null)).toEqual({ valid: false, error: DEFAULT_MESSAGES.required });
    expect(validateAmount(undefined)).toEqual({
      valid: false,
      error: DEFAULT_MESSAGES.required,
    });
  });

  it('rejeita zero e valores negativos', () => {
    expect(validateAmount('0')).toEqual({ valid: false, error: DEFAULT_MESSAGES.required });
    expect(validateAmount('0,00')).toEqual({ valid: false, error: DEFAULT_MESSAGES.required });
    expect(validateAmount('-1')).toEqual({ valid: false, error: DEFAULT_MESSAGES.required });
  });

  it('rejeita texto e valores não finitos', () => {
    expect(validateAmount('abc')).toEqual({ valid: false, error: DEFAULT_MESSAGES.invalid });
    expect(validateAmount('1,2,3')).toEqual({ valid: false, error: DEFAULT_MESSAGES.invalid });
    expect(validateAmount('Infinity')).toEqual({
      valid: false,
      error: DEFAULT_MESSAGES.invalid,
    });
  });

  it('usa mensagens traduzidas quando recebidas', () => {
    const messages = { required: 'Enter an amount', invalid: 'Invalid number' };
    expect(validateAmount('', messages).error).toBe('Enter an amount');
    expect(validateAmount('abc', messages).error).toBe('Invalid number');
  });
});
