const EMPTY_FILTERS = {
  startDate: '',
  endDate: '',
  minRate: '',
  maxRate: '',
};

function isValidIsoDate(iso) {
  const [year, month, day] = iso.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

export function parseDateInput(value) {
  if (!value) return null;
  const trimmed = String(value).trim();
  const br = trimmed.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (br) {
    const iso = `${br[3]}-${br[2]}-${br[1]}`;
    return isValidIsoDate(iso) ? iso : null;
  }
  const iso = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (iso && isValidIsoDate(trimmed)) return trimmed;
  return null;
}

export function parseRateInput(value) {
  if (value === '' || value === null || value === undefined) return null;
  const parsed = Number(String(value).replace(',', '.').trim());
  return Number.isFinite(parsed) ? parsed : null;
}

export function filterRates(rates = [], filters = {}) {
  const start = parseDateInput(filters.startDate);
  const end = parseDateInput(filters.endDate);
  const min = parseRateInput(filters.minRate);
  const max = parseRateInput(filters.maxRate);

  return rates.filter((row) => {
    if (start && row.date < start) return false;
    if (end && row.date > end) return false;
    if (min !== null && Number(row.rate) < min) return false;
    if (max !== null && Number(row.rate) > max) return false;
    return true;
  });
}

const DEFAULT_MESSAGES = {
  invalidDate: 'Use o formato dd/mm/aaaa.',
  invalidRate: 'Digite um número válido.',
  dateRange: 'A data inicial deve ser anterior à final.',
  rateRange: 'A cotação mínima deve ser menor que a máxima.',
};

export function validateFilters(filters = {}, messages = DEFAULT_MESSAGES) {
  const errors = {};
  const start = parseDateInput(filters.startDate);
  const end = parseDateInput(filters.endDate);
  const min = parseRateInput(filters.minRate);
  const max = parseRateInput(filters.maxRate);

  if (filters.startDate && !start) errors.startDate = messages.invalidDate;
  if (filters.endDate && !end) errors.endDate = messages.invalidDate;
  if (filters.minRate && min === null) errors.minRate = messages.invalidRate;
  if (filters.maxRate && max === null) errors.maxRate = messages.invalidRate;
  if (start && end && start > end) errors.range = messages.dateRange;
  if (min !== null && max !== null && min > max) errors.rates = messages.rateRange;

  return errors;
}

export { EMPTY_FILTERS };
export default filterRates;
