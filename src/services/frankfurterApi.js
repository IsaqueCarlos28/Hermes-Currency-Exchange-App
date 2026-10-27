const BASE_URL = 'https://api.frankfurter.app';

export async function fetchCurrencies() {
  const res = await fetch(`${BASE_URL}/v2/currencies`);
  if (!res.ok) throw new Error('Failed to fetch currencies');
  return res.json();
}

export async function fetchLatestRate(from, to) {
  const res = await fetch(`${BASE_URL}/v2/latest?from=${from}&to=${to}`);
  if (!res.ok) throw new Error('Failed to fetch latest rate');
  return res.json();
}

export async function fetchHistoricalRates(from, to, startDate, endDate) {
  const res = await fetch(`${BASE_URL}/v2/${startDate}..${endDate}?from=${from}&to=${to}`);
  if (!res.ok) throw new Error('Failed to fetch historical rates');
  return res.json();
}

export default { fetchCurrencies, fetchLatestRate, fetchHistoricalRates };
