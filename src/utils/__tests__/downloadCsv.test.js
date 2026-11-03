import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import downloadCsv from '../downloadCsv';

let createObjectURL;

beforeEach(() => {
  createObjectURL = vi.fn().mockReturnValue('blob:hermes');
  Object.defineProperty(URL, 'createObjectURL', {
    configurable: true,
    writable: true,
    value: createObjectURL,
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('downloadCsv', () => {
  it('creates a CSV blob and downloads it with the given filename', async () => {
    let anchor;
    const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function () {
      anchor = this;
    });

    downloadCsv('hermes-USD-BRL.csv', '\uFEFFData;Origem;Destino;Cotação');

    expect(createObjectURL).toHaveBeenCalledTimes(1);
    const blob = createObjectURL.mock.calls[0][0];
    expect(blob).toBeInstanceOf(Blob);
    expect(blob.type).toBe('text/csv;charset=utf-8;');
    expect(await blob.text()).toBe('Data;Origem;Destino;Cotação');

    const bytes = new Uint8Array(await blob.arrayBuffer());
    expect([...bytes.slice(0, 3)]).toEqual([0xef, 0xbb, 0xbf]);

    expect(click).toHaveBeenCalledTimes(1);
    expect(anchor.download).toBe('hermes-USD-BRL.csv');
    expect(anchor.getAttribute('href')).toBe('blob:hermes');
  });

  it('attaches the link to the document before clicking and removes it afterwards', () => {
    let anchor;
    let connectedAtClick;
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function () {
      anchor = this;
      connectedAtClick = document.body.contains(this);
    });

    downloadCsv('rates.csv', 'a;b');

    expect(connectedAtClick).toBe(true);
    expect(anchor.style.visibility).toBe('hidden');
    expect(anchor.isConnected).toBe(false);
    expect(document.body.contains(anchor)).toBe(false);
  });
});
