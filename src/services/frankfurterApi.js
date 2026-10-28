const BASE_URL = 'https://api.frankfurter.dev';

export class ApiError extends Error {
  constructor(message, status, url) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.url = url;
  }
}

async function request(path, { signal } = {}) {
  const url = `${BASE_URL}${path}`;
  const res = await fetch(url, {
    signal,
    headers: { Accept: 'application/json' },
  });

  if (!res.ok) {
    let message = `Request failed with status ${res.status}`;
    try {
      const body = await res.json();
      if (body?.message) message = body.message;
    } catch {
      // Erros 404 podem vir sem corpo JSON; mantém a mensagem padrão.
    }
    throw new ApiError(message, res.status, url);
  }

  return res.json();
}

export function fetchCurrencies({ signal } = {}) {
  return request('/v2/currencies', { signal });
}

export function fetchLatestRate(from, to, { signal } = {}) {
  return request(
    `/v2/rate/${encodeURIComponent(from)}/${encodeURIComponent(to)}`,
    { signal },
  );
}

export function fetchHistoricalRates(from, to, startDate, endDate, { signal } = {}) {
  const params = new URLSearchParams({
    base: from,
    quotes: to,
    from: startDate,
    to: endDate,
  });

  return request(`/v2/rates?${params.toString()}`, { signal });
}

export default { fetchCurrencies, fetchLatestRate, fetchHistoricalRates };
