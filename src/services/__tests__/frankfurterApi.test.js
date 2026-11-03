import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  fetchCurrencies,
  fetchHistoricalRates,
  fetchLatestRate,
} from '../frankfurterApi';

function jsonResponse(data, { ok = true, status = 200 } = {}) {
  return {
    ok,
    status,
    json: vi.fn().mockResolvedValue(data),
  };
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('frankfurterApi', () => {
  it('requests the currencies endpoint', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse([{ iso_code: 'USD' }]));
    vi.stubGlobal('fetch', fetchMock);

    await expect(fetchCurrencies()).resolves.toEqual([{ iso_code: 'USD' }]);
    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.frankfurter.dev/v2/currencies',
      expect.objectContaining({ headers: { accept: 'application/json' } }),
    );
  });

  it('requests the latest rate for the selected pair', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ rate: 5.4515 }));
    vi.stubGlobal('fetch', fetchMock);

    await fetchLatestRate('USD', 'BRL');
    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.frankfurter.dev/v2/rate/USD/BRL',
      expect.any(Object),
    );
  });

  it('encodes currency codes in the latest rate URL', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ rate: 1 }));
    vi.stubGlobal('fetch', fetchMock);

    await fetchLatestRate('A/B', 'C D');
    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.frankfurter.dev/v2/rate/A%2FB/C%20D',
      expect.any(Object),
    );
  });

  it('builds the historical rates query string', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse([]));
    vi.stubGlobal('fetch', fetchMock);

    await fetchHistoricalRates('USD', 'BRL', '2026-10-04', '2026-11-03');
    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.frankfurter.dev/v2/rates?base=USD&quotes=BRL&from=2026-10-04&to=2026-11-03',
      expect.any(Object),
    );
  });

  it('forwards the abort signal', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse([]));
    vi.stubGlobal('fetch', fetchMock);
    const controller = new AbortController();

    await fetchCurrencies({ signal: controller.signal });
    expect(fetchMock).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ signal: controller.signal }),
    );
  });

  it('throws an error with the HTTP status for failed responses', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse(null, { ok: false, status: 404 })));

    await expect(fetchCurrencies()).rejects.toMatchObject({
      message: 'Frankfurter request failed with status 404',
      status: 404,
    });
  });
});
