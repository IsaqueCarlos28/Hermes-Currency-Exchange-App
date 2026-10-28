/*
 * Adaptadores entre as respostas da Frankfurter (v2) e o modelo usado pela UI.
 *
 * Formatos da API:
 *   /v2/currencies -> [{ iso_code, name, ... }]
 *   /v2/rate/{from}/{to} -> { date, base, quote, rate }
 *   /v2/rates -> [{ date, base, quote, rate }]
 *
 * Formatos internos:
 *   moeda: { value, label, name }
 *   taxa: { date, from, to, rate }
 *   histórico: [{ date, from, to, rate }] em ordem crescente de data
 */

const ISO_CODE_PATTERN = /^[A-Z]{3}$/;

// Criptomoedas, metais e direitos especiais de saque não são moedas de câmbio
// (e não são aceitos pelo Intl.NumberFormat com style: 'currency').
const NON_FIAT_CODES = new Set([
  'BCH',
  'BTC',
  'ETH',
  'LTC',
  'XAG',
  'XAU',
  'XDR',
  'XPD',
  'XPT',
  'XRP',
]);

function normalizeCode(value) {
  return String(value ?? '').trim().toUpperCase();
}

function normalizeDate(value) {
  const text = String(value ?? '').trim().slice(0, 10);
  const match = text.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return '';

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));
  const isValid =
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day;

  return isValid ? text : '';
}

function normalizeRate(value) {
  const rate = Number(value);
  return Number.isFinite(rate) && rate > 0 ? rate : null;
}

export function normalizeCurrencies(payload) {
  if (!Array.isArray(payload)) return [];

  const seen = new Set();
  const options = [];

  for (const item of payload) {
    const value = normalizeCode(item?.iso_code);
    const isFiat =
      ISO_CODE_PATTERN.test(value) && !NON_FIAT_CODES.has(value) && !seen.has(value);

    if (!isFiat) continue;

    seen.add(value);
    options.push({
      value,
      label: value,
      name: String(item?.name ?? value),
    });
  }

  return options.sort((a, b) => a.value.localeCompare(b.value));
}

export function normalizeLatestRate(payload, fallback = {}) {
  if (!payload || typeof payload !== 'object') return null;

  const date = normalizeDate(payload.date);
  const rate = normalizeRate(payload.rate);
  if (!date || rate === null) return null;

  return {
    date,
    from: normalizeCode(payload.base) || normalizeCode(fallback.from),
    to: normalizeCode(payload.quote) || normalizeCode(fallback.to),
    rate,
  };
}

export function normalizeHistoricalRates(payload, fallback = {}) {
  if (!Array.isArray(payload)) return [];

  const seen = new Set();
  const rows = [];

  for (const item of payload) {
    const date = normalizeDate(item?.date);
    const rate = normalizeRate(item?.rate);
    const from = normalizeCode(item?.base) || normalizeCode(fallback.from);
    const to = normalizeCode(item?.quote) || normalizeCode(fallback.to);

    if (!date || rate === null) continue;

    const key = `${date}-${from}-${to}`;
    if (seen.has(key)) continue;

    seen.add(key);
    rows.push({ date, from, to, rate });
  }

  return rows.sort(
    (a, b) => a.date.localeCompare(b.date) || a.to.localeCompare(b.to),
  );
}

export { NON_FIAT_CODES };
