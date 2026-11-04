const EMPTY_FILTERS = {
  startDate: '',
  endDate: '',
  minRate: '',
  maxRate: '',
};

/*
 * O campo de data aceita o formato local do idioma da interface e também ISO.
 * PT/ES usam dd/mm/aaaa e EN usa mm/dd/yyyy; aceitar os dois sentidos na mesma
 * interface tornaria datas como 05/03/2026 ambíguas.
 */
const DATE_ORDERS = {
  PT: 'dmy',
  EN: 'mdy',
  ES: 'dmy',
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

export function parseDateInput(value, language = 'PT') {
  if (!value) return null;

  const trimmed = String(value).trim();
  if (!trimmed) return null;

  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    return isValidIsoDate(trimmed) ? trimmed : null;
  }

  const local = trimmed.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!local) return null;

  const [, first, second, year] = local;
  const order = DATE_ORDERS[language] || DATE_ORDERS.PT;
  const iso = order === 'mdy' ? `${year}-${first}-${second}` : `${year}-${second}-${first}`;

  return isValidIsoDate(iso) ? iso : null;
}

export function parseRateInput(value) {
  if (value === '' || value === null || value === undefined) return null;

  const trimmed = String(value).trim();
  if (!trimmed) return null;

  const parsed = Number(trimmed.replace(',', '.'));
  return Number.isFinite(parsed) ? parsed : null;
}

export function filterRates(rates = [], filters = {}, language = 'PT') {
  const start = parseDateInput(filters.startDate, language);
  const end = parseDateInput(filters.endDate, language);
  const min = parseRateInput(filters.minRate);
  const max = parseRateInput(filters.maxRate);

  // Faixas invertidas são erro de entrada: aplicá-las descartaria todos os
  // registros e a tabela pareceria vazia. A filtragem é suspensa e a mensagem
  // de validação explica o motivo (RN-14 e RN-15).
  if ((start && end && start > end) || (min !== null && max !== null && min > max)) {
    return rates;
  }

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

export function validateFilters(filters = {}, messages = DEFAULT_MESSAGES, language = 'PT') {
  const errors = {};
  const start = parseDateInput(filters.startDate, language);
  const end = parseDateInput(filters.endDate, language);
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
