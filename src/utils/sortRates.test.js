import { describe, expect, it } from 'vitest';
import sortRates from './sortRates';

const ROWS = [
  { date: '2026-10-15', rate: 5.4218 },
  { date: '2026-10-01', rate: 5.75 },
  { date: '2026-10-31', rate: 5.1 },
];

const dates = (rows) => rows.map((row) => row.date);
const rates = (rows) => rows.map((row) => row.rate);

describe('sortRates', () => {
  it('ordena por data decrescente por padrão', () => {
    expect(dates(sortRates(ROWS))).toEqual(['2026-10-31', '2026-10-15', '2026-10-01']);
    expect(dates(sortRates(ROWS, { field: 'date', direction: 'desc' }))).toEqual([
      '2026-10-31',
      '2026-10-15',
      '2026-10-01',
    ]);
  });

  it('ordena por data crescente', () => {
    expect(dates(sortRates(ROWS, { field: 'date', direction: 'asc' }))).toEqual([
      '2026-10-01',
      '2026-10-15',
      '2026-10-31',
    ]);
  });

  it('ordena por cotação crescente e decrescente', () => {
    expect(rates(sortRates(ROWS, { field: 'rate', direction: 'asc' }))).toEqual([
      5.1, 5.4218, 5.75,
    ]);
    expect(rates(sortRates(ROWS, { field: 'rate', direction: 'desc' }))).toEqual([
      5.75, 5.4218, 5.1,
    ]);
  });

  it('trata cotação como número, não como texto', () => {
    const rows = [
      { date: '2026-10-01', rate: '9.5' },
      { date: '2026-10-02', rate: '10.5' },
    ];
    expect(rates(sortRates(rows, { field: 'rate', direction: 'asc' }))).toEqual([
      '9.5',
      '10.5',
    ]);
  });

  it('usa data decrescente quando a ordenação não é informada', () => {
    expect(dates(sortRates(ROWS, undefined))).toEqual([
      '2026-10-31',
      '2026-10-15',
      '2026-10-01',
    ]);
  });

  it('não altera o array recebido', () => {
    const copy = [...ROWS];
    sortRates(ROWS, { field: 'rate', direction: 'asc' });
    expect(ROWS).toEqual(copy);
  });
});
