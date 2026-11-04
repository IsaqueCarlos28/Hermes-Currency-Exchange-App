import { describe, expect, it } from 'vitest';
import buildCsv from './buildCsv';

const HEADERS = ['Data', 'Origem', 'Destino', 'Cotação'];

describe('buildCsv', () => {
  it('monta cabeçalho e linhas separados por ponto e vírgula', () => {
    const csv = buildCsv([['27/10/2026', 'USD', 'BRL', '5,4218']], HEADERS);
    expect(csv).toBe('Data;Origem;Destino;Cotação\r\n27/10/2026;USD;BRL;5,4218');
  });

  it('usa CRLF entre as linhas', () => {
    const csv = buildCsv(
      [
        ['27/10/2026', 'USD', 'BRL', '5,4218'],
        ['26/10/2026', 'USD', 'BRL', '5,4000'],
      ],
      HEADERS,
    );
    expect(csv.split('\r\n')).toHaveLength(3);
    expect(csv).not.toMatch(/[^\r]\n/);
  });

  it('escapa células com ponto e vírgula, aspas e quebra de linha', () => {
    const csv = buildCsv([['a;b', 'c"d', 'e\nf']], ['h1', 'h2', 'h3']);
    expect(csv).toBe('h1;h2;h3\r\n"a;b";"c""d";"e\nf"');
  });

  it('aceita linhas como objeto, seguindo a ordem dos valores', () => {
    const csv = buildCsv([{ data: '27/10/2026', par: 'USD' }], ['Data', 'Par']);
    expect(csv).toBe('Data;Par\r\n27/10/2026;USD');
  });

  it('trata valores nulos e indefinidos como célula vazia', () => {
    const csv = buildCsv([[null, undefined, 'BRL']], ['a', 'b', 'c']);
    expect(csv).toBe('a;b;c\r\n;;BRL');
  });

  it('devolve apenas o cabeçalho quando não há linhas', () => {
    expect(buildCsv([], HEADERS)).toBe(HEADERS.join(';'));
  });

  it('inclui o BOM UTF-8 quando solicitado', () => {
    const csv = buildCsv([['27/10/2026', 'USD', 'BRL', '5,4218']], HEADERS, { bom: true });
    expect(csv.startsWith('\uFEFF')).toBe(true);
    expect(csv.slice(1).startsWith('Data;Origem')).toBe(true);
  });

  it('não inclui o BOM por padrão', () => {
    expect(buildCsv([['1']], ['h']).startsWith('\uFEFF')).toBe(false);
  });
});
