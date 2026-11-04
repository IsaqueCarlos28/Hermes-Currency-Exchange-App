import { describe, expect, it } from 'vitest';
import convertAmount from './convertAmount';

describe('convertAmount', () => {
  it('multiplica o valor informado pela taxa do par', () => {
    expect(convertAmount('100', 5.4218)).toBeCloseTo(542.18, 2);
    expect(convertAmount(2, 3)).toBe(6);
  });

  it('aceita vírgula como separador decimal', () => {
    expect(convertAmount('1,5', 2)).toBe(3);
  });

  it('devolve null quando o valor ou a taxa não são numéricos', () => {
    expect(convertAmount('abc', 5)).toBeNull();
    expect(convertAmount('100', null)).toBeNull();
    expect(convertAmount('100', undefined)).toBeNull();
    expect(convertAmount('', 5)).toBeNull();
  });

  it('não valida o sinal do valor: a validação pertence a validateAmount', () => {
    expect(convertAmount('-1', 5)).toBe(-5);
  });
});
