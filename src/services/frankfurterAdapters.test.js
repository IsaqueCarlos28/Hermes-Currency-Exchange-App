import { describe, expect, it } from 'vitest';
import {
  NON_FIAT_CODES,
  normalizeCurrencies,
  normalizeHistoricalRates,
  normalizeLatestRate,
} from './frankfurterAdapters';

describe('normalizeCurrencies', () => {
  const payload = [
    { iso_code: 'USD', name: 'United States Dollar' },
    { iso_code: 'BRL', name: 'Brazilian Real' },
    { iso_code: 'eur', name: 'Euro' },
    { iso_code: 'EUR', name: 'Euro duplicado' },
    { iso_code: 'BTC', name: 'Bitcoin' },
    { iso_code: 'XAU', name: 'Gold' },
    { iso_code: 'XDR', name: 'SDR' },
    { iso_code: 'CM', name: 'Inválida' },
    { iso_code: null, name: 'Sem código' },
  ];

  it('mantém apenas moedas fiduciárias e normaliza o código', () => {
    const currencies = normalizeCurrencies(payload);
    expect(currencies.map((currency) => currency.value)).toEqual(['BRL', 'EUR', 'USD']);
  });

  it('remove duplicatas e ordena por código', () => {
    const currencies = normalizeCurrencies(payload);
    expect(currencies).toHaveLength(3);
    expect(currencies[1]).toEqual({ value: 'EUR', label: 'EUR', name: 'Euro' });
  });

  it('usa o código como nome quando o nome não vem', () => {
    const [currency] = normalizeCurrencies([{ iso_code: 'GBP' }]);
    expect(currency.name).toBe('GBP');
  });

  it('devolve lista vazia para payload inválido', () => {
    expect(normalizeCurrencies(null)).toEqual([]);
    expect(normalizeCurrencies({})).toEqual([]);
  });

  it('expõe os códigos não fiduciários excluídos', () => {
    expect(NON_FIAT_CODES.has('BTC')).toBe(true);
    expect(NON_FIAT_CODES.has('USD')).toBe(false);
  });
});

describe('normalizeLatestRate', () => {
  it('normaliza a resposta da taxa atual', () => {
    expect(
      normalizeLatestRate({ date: '2026-10-27', base: 'EUR', quote: 'USD', rate: 1.1186 }),
    ).toEqual({ date: '2026-10-27', from: 'EUR', to: 'USD', rate: 1.1186 });
  });

  it('usa o par solicitado como fallback', () => {
    expect(
      normalizeLatestRate({ date: '2026-10-27', rate: 5.4218 }, { from: 'USD', to: 'BRL' }),
    ).toEqual({ date: '2026-10-27', from: 'USD', to: 'BRL', rate: 5.4218 });
  });

  it('descarta datas inválidas e taxas não positivas', () => {
    expect(normalizeLatestRate({ date: '2026-02-30', rate: 5 })).toBeNull();
    expect(normalizeLatestRate({ date: '2026-10-27', rate: 0 })).toBeNull();
    expect(normalizeLatestRate({ date: '2026-10-27', rate: 'abc' })).toBeNull();
    expect(normalizeLatestRate({ date: '', rate: 5 })).toBeNull();
  });

  it('descarta payload que não é objeto', () => {
    expect(normalizeLatestRate(null)).toBeNull();
    expect(normalizeLatestRate([])).toBeNull();
    expect(normalizeLatestRate('texto')).toBeNull();
  });
});

describe('normalizeHistoricalRates', () => {
  it('normaliza, ordena e remove duplicatas', () => {
    const rows = normalizeHistoricalRates(
      [
        { date: '2026-10-15', base: 'USD', quote: 'BRL', rate: 5.4 },
        { date: '2026-10-01', base: 'USD', quote: 'BRL', rate: 5.1 },
        { date: '2026-10-15', base: 'USD', quote: 'BRL', rate: 5.4 },
      ],
      { from: 'USD', to: 'BRL' },
    );

    expect(rows).toEqual([
      { date: '2026-10-01', from: 'USD', to: 'BRL', rate: 5.1 },
      { date: '2026-10-15', from: 'USD', to: 'BRL', rate: 5.4 },
    ]);
  });

  it('remove itens sem data válida ou com taxa inválida', () => {
    const rows = normalizeHistoricalRates([
      { date: '2026-10-01', base: 'USD', quote: 'BRL', rate: 5.1 },
      { date: '2026-02-30', base: 'USD', quote: 'BRL', rate: 5.2 },
      { date: '2026-10-02', base: 'USD', quote: 'BRL', rate: null },
    ]);

    expect(rows).toHaveLength(1);
  });

  it('usa o par solicitado quando a API não devolve base e quote', () => {
    const rows = normalizeHistoricalRates([{ date: '2026-10-01', rate: 5.1 }], {
      from: 'USD',
      to: 'BRL',
    });
    expect(rows[0]).toEqual({ date: '2026-10-01', from: 'USD', to: 'BRL', rate: 5.1 });
  });

  it('devolve lista vazia para payload inválido', () => {
    expect(normalizeHistoricalRates(null)).toEqual([]);
    expect(normalizeHistoricalRates({})).toEqual([]);
    expect(normalizeHistoricalRates([])).toEqual([]);
  });
});
