import { describe, expect, it } from 'vitest';
import {
  formatCurrency,
  formatDate,
  formatNumber,
  formatPercent,
  formatRate,
  formatShortDate,
  localeFor,
} from './formatters';

describe('localeFor', () => {
  it('mapeia os idiomas da interface para locales do Intl', () => {
    expect(localeFor('PT')).toBe('pt-BR');
    expect(localeFor('EN')).toBe('en-US');
    expect(localeFor('ES')).toBe('es-ES');
  });

  it('usa PT como padrão', () => {
    expect(localeFor()).toBe('pt-BR');
    expect(localeFor('FR')).toBe('pt-BR');
  });
});

describe('formatNumber', () => {
  it('formata números com duas casas por padrão', () => {
    expect(formatNumber(1234.5, 'PT')).toBe('1.234,50');
    expect(formatNumber(1234.5, 'EN')).toBe('1,234.50');
  });

  it('devolve string vazia para valores inválidos', () => {
    expect(formatNumber('abc', 'PT')).toBe('');
    expect(formatNumber(null, 'PT')).toBe('0,00');
    expect(formatNumber(undefined, 'PT')).toBe('');
  });
});

describe('formatRate', () => {
  it('mostra de 4 a 6 casas decimais', () => {
    expect(formatRate(5.4, 'PT')).toBe('5,4000');
    expect(formatRate(5.4218, 'PT')).toBe('5,4218');
    expect(formatRate(5.4218123, 'EN')).toBe('5.421812');
  });

  it('devolve string vazia para valores inválidos', () => {
    expect(formatRate('abc', 'PT')).toBe('');
  });
});

describe('formatCurrency', () => {
  it('formata o valor com o código da moeda de destino', () => {
    expect(formatCurrency(542.18, 'BRL', 'PT')).toContain('542,18');
    expect(formatCurrency(542.18, 'USD', 'EN')).toContain('542.18');
  });

  it('devolve "--" sem valor ou sem moeda', () => {
    expect(formatCurrency(100, undefined, 'PT')).toBe('--');
    expect(formatCurrency('abc', 'BRL', 'PT')).toBe('--');
  });
});

describe('formatDate', () => {
  it('formata a data conforme o idioma', () => {
    expect(formatDate('2026-10-27', 'PT')).toBe('27/10/2026');
    expect(formatDate('2026-10-27', 'EN')).toBe('10/27/2026');
    expect(formatDate('2026-10-27', 'ES')).toBe('27/10/2026');
  });

  it('mantém a data do calendário em qualquer fuso', () => {
    expect(formatDate('2026-01-01', 'PT')).toBe('01/01/2026');
    expect(formatDate('2026-12-31', 'PT')).toBe('31/12/2026');
  });

  it('aceita Date e ignora o horário informado', () => {
    expect(formatDate(new Date('2026-10-27T00:00:00Z'), 'PT')).toBe('27/10/2026');
    expect(formatDate('2026-10-27T18:30:00Z', 'PT')).toBe('27/10/2026');
  });

  it('devolve vazio ou o próprio valor quando não é data', () => {
    expect(formatDate('', 'PT')).toBe('');
    expect(formatDate(null, 'PT')).toBe('');
    expect(formatDate('abc', 'PT')).toBe('abc');
  });
});

describe('formatShortDate', () => {
  it('mostra dia e mês', () => {
    expect(formatShortDate('2026-10-27', 'PT')).toBe('27/10');
    expect(formatShortDate('2026-10-27', 'EN')).toBe('10/27');
  });

  it('devolve vazio sem valor', () => {
    expect(formatShortDate(null, 'PT')).toBe('');
  });
});

describe('formatPercent', () => {
  it('inclui sinal e percentual', () => {
    expect(formatPercent(1.5, 'PT')).toBe('+1,50%');
    expect(formatPercent(-2, 'PT')).toBe('\u22122,00%');
    expect(formatPercent(0, 'EN')).toBe('+0.00%');
  });

  it('devolve string vazia para valores inválidos', () => {
    expect(formatPercent('abc', 'PT')).toBe('');
  });
});
