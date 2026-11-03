import { describe, expect, it } from 'vitest';
import buildCsv from '../buildCsv';
import filterRates from '../filterRates';
import sortRates from '../sortRates';
import { formatDate, formatRate } from '../formatters';

describe('buildCsv', () => {
  it('builds a header and rows with semicolons and CRLF', () => {
    const csv = buildCsv(
      [
        ['03/11/2026', 'USD', 'BRL', '5,4515'],
        ['02/11/2026', 'USD', 'BRL', '5,4277'],
      ],
      ['Data', 'Origem', 'Destino', 'Cotação'],
    );

    expect(csv).toBe(
      'Data;Origem;Destino;Cotação\r\n03/11/2026;USD;BRL;5,4515\r\n02/11/2026;USD;BRL;5,4277',
    );
  });

  it('returns only the header when there are no rows', () => {
    expect(buildCsv([], ['Data', 'Cotação'])).toBe('Data;Cotação');
  });

  it('escapes cells containing semicolons, quotes, or line breaks', () => {
    const csv = buildCsv([['a;b', 'say "hi"', 'line\nbreak']], ['A', 'B', 'C']);
    expect(csv.split('\r\n')[1]).toBe('"a;b";"say ""hi""";"line\nbreak"');
  });

  it('converts null and undefined cells to empty strings', () => {
    expect(buildCsv([[null, undefined, 0]], ['A', 'B', 'C'])).toBe('A;B;C\r\n;;0');
  });

  it('accepts object rows using their values in insertion order', () => {
    const csv = buildCsv([{ date: '03/11/2026', rate: '5,4515' }], ['Data', 'Cotação']);
    expect(csv).toBe('Data;Cotação\r\n03/11/2026;5,4515');
  });

  it('supports localized headers', () => {
    const csv = buildCsv([['03/11/2026', '5,4515']], ['Date', 'Rate']);
    expect(csv.startsWith('Date;Rate\r\n')).toBe(true);
  });

  it('exports exactly the filtered and sorted records', () => {
    const rates = [
      { date: '2026-10-15', rate: 5.39 },
      { date: '2026-10-31', rate: 5.41 },
      { date: '2026-11-03', rate: 5.45 },
    ];

    const rows = sortRates(
      filterRates(rates, { startDate: '01/10/2026', maxRate: '5,41' }, 'PT'),
      { field: 'rate', direction: 'asc' },
    );

    const csv = buildCsv(
      rows.map((row) => [
        formatDate(row.date, 'PT'),
        'USD',
        'BRL',
        formatRate(row.rate, 'PT', 4, 4),
      ]),
      ['Data', 'Origem', 'Destino', 'Cotação'],
    );

    expect(csv.split('\r\n')).toEqual([
      'Data;Origem;Destino;Cotação',
      '15/10/2026;USD;BRL;5,3900',
      '31/10/2026;USD;BRL;5,4100',
    ]);
  });
});
