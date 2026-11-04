import { describe, expect, it } from 'vitest';
import filterRates, {
  EMPTY_FILTERS,
  parseDateInput,
  parseRateInput,
  validateFilters,
} from './filterRates';

const ROWS = [
  { date: '2026-10-01', from: 'USD', to: 'BRL', rate: 5.1 },
  { date: '2026-10-15', from: 'USD', to: 'BRL', rate: 5.4218 },
  { date: '2026-10-31', from: 'USD', to: 'BRL', rate: 5.75 },
];

describe('parseDateInput', () => {
  it('aceita ISO em qualquer idioma', () => {
    expect(parseDateInput('2026-10-27')).toBe('2026-10-27');
    expect(parseDateInput('2026-10-27', 'EN')).toBe('2026-10-27');
    expect(parseDateInput('2026-10-27', 'ES')).toBe('2026-10-27');
  });

  it('aceita dd/mm/aaaa em PT e ES', () => {
    expect(parseDateInput('27/10/2026', 'PT')).toBe('2026-10-27');
    expect(parseDateInput('27/10/2026', 'ES')).toBe('2026-10-27');
  });

  it('aceita mm/dd/yyyy em EN', () => {
    expect(parseDateInput('10/27/2026', 'EN')).toBe('2026-10-27');
  });

  it('interpreta a data ambígua conforme o idioma', () => {
    expect(parseDateInput('05/03/2026', 'PT')).toBe('2026-03-05');
    expect(parseDateInput('05/03/2026', 'ES')).toBe('2026-03-05');
    expect(parseDateInput('05/03/2026', 'EN')).toBe('2026-05-03');
  });

  it('aceita 29/02 em ano bissexto e rejeita em ano comum', () => {
    expect(parseDateInput('29/02/2024')).toBe('2024-02-29');
    expect(parseDateInput('29/02/2026')).toBeNull();
  });

  it('rejeita datas impossíveis e formatos inesperados', () => {
    expect(parseDateInput('31/04/2026')).toBeNull();
    expect(parseDateInput('2026-02-30')).toBeNull();
    expect(parseDateInput('13/03/2026', 'EN')).toBeNull();
    expect(parseDateInput('10/27/2026', 'PT')).toBeNull();
    expect(parseDateInput('27-10-2026')).toBeNull();
    expect(parseDateInput('')).toBeNull();
    expect(parseDateInput(null)).toBeNull();
    expect(parseDateInput(undefined)).toBeNull();
  });
});

describe('parseRateInput', () => {
  it('aceita vírgula e ponto como separador decimal', () => {
    expect(parseRateInput('5,4218')).toBe(5.4218);
    expect(parseRateInput('5.4218')).toBe(5.4218);
    expect(parseRateInput(5.4218)).toBe(5.4218);
  });

  it('trata vazio e espaços como ausência de filtro', () => {
    expect(parseRateInput('')).toBeNull();
    expect(parseRateInput('   ')).toBeNull();
    expect(parseRateInput(null)).toBeNull();
    expect(parseRateInput(undefined)).toBeNull();
  });

  it('rejeita texto que não é número', () => {
    expect(parseRateInput('abc')).toBeNull();
    expect(parseRateInput('5,4,2')).toBeNull();
  });
});

describe('filterRates', () => {
  it('sem filtros devolve todos os registros', () => {
    expect(filterRates(ROWS, EMPTY_FILTERS)).toHaveLength(3);
    expect(filterRates(ROWS)).toHaveLength(3);
  });

  it('aplica limites de data inclusivos', () => {
    const result = filterRates(ROWS, { startDate: '01/10/2026', endDate: '15/10/2026' });
    expect(result.map((row) => row.date)).toEqual(['2026-10-01', '2026-10-15']);
  });

  it('aplica apenas um dos limites de data', () => {
    expect(
      filterRates(ROWS, { startDate: '15/10/2026' }).map((row) => row.date),
    ).toEqual(['2026-10-15', '2026-10-31']);
    expect(
      filterRates(ROWS, { endDate: '15/10/2026' }).map((row) => row.date),
    ).toEqual(['2026-10-01', '2026-10-15']);
  });

  it('aplica limites de cotação inclusivos', () => {
    const result = filterRates(ROWS, { minRate: '5,1', maxRate: '5,4218' });
    expect(result.map((row) => row.rate)).toEqual([5.1, 5.4218]);
  });

  it('combina filtros de data e cotação com AND', () => {
    const result = filterRates(ROWS, {
      startDate: '02/10/2026',
      endDate: '31/10/2026',
      minRate: '5,5',
    });
    expect(result.map((row) => row.date)).toEqual(['2026-10-31']);
  });

  it('ignora faixa de datas invertida em vez de esvaziar a tabela', () => {
    const result = filterRates(ROWS, { startDate: '31/10/2026', endDate: '01/10/2026' });
    expect(result).toHaveLength(3);
  });

  it('ignora faixa de cotação invertida em vez de esvaziar a tabela', () => {
    const result = filterRates(ROWS, { minRate: '5,75', maxRate: '5,1' });
    expect(result).toHaveLength(3);
  });

  it('ignora campo inválido e mantém os filtros válidos', () => {
    const result = filterRates(ROWS, { startDate: '31/02/2026', minRate: '5,5' });
    expect(result.map((row) => row.date)).toEqual(['2026-10-31']);
  });

  it('interpreta datas do filtro conforme o idioma', () => {
    expect(filterRates(ROWS, { startDate: '10/05/2026' }, 'PT')).toHaveLength(3);
    expect(filterRates(ROWS, { startDate: '10/05/2026' }, 'EN')).toHaveLength(2);
    expect(filterRates(ROWS, { endDate: '10/05/2026' }, 'PT')).toHaveLength(0);
  });

  it('não altera o array recebido', () => {
    const copy = [...ROWS];
    filterRates(ROWS, { minRate: '5,5' });
    expect(ROWS).toEqual(copy);
  });
});

describe('validateFilters', () => {
  const messages = {
    invalidDate: 'data',
    invalidRate: 'cotação',
    dateRange: 'intervalo',
    rateRange: 'faixa',
  };

  it('não aponta erro sem filtros', () => {
    expect(validateFilters(EMPTY_FILTERS, messages)).toEqual({});
  });

  it('aponta campo de data inválido', () => {
    expect(validateFilters({ startDate: '31/02/2026' }, messages).startDate).toBe('data');
  });

  it('aponta campo de cotação inválido', () => {
    expect(validateFilters({ minRate: 'abc' }, messages).minRate).toBe('cotação');
  });

  it('aponta intervalo de datas invertido', () => {
    const errors = validateFilters(
      { startDate: '31/10/2026', endDate: '01/10/2026' },
      messages,
    );
    expect(errors.range).toBe('intervalo');
  });

  it('aponta faixa de cotação invertida', () => {
    const errors = validateFilters({ minRate: '6', maxRate: '5' }, messages);
    expect(errors.rates).toBe('faixa');
  });

  it('valida datas conforme o idioma', () => {
    expect(validateFilters({ startDate: '10/05/2026' }, messages, 'EN')).toEqual({});
    expect(validateFilters({ startDate: '10/05/2026' }, messages, 'PT')).toEqual({});
    expect(validateFilters({ startDate: '27/10/2026' }, messages, 'EN').startDate).toBe(
      'data',
    );
  });
});
