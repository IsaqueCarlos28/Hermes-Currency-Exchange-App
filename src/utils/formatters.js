const LOCALES = {
  PT: 'pt-BR',
  EN: 'en-US',
  ES: 'es-ES',
};

export function localeFor(language = 'PT') {
  return LOCALES[language] || LOCALES.PT;
}

export function formatNumber(value, language = 'PT', digits = 2) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return '';
  return new Intl.NumberFormat(localeFor(language), {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(parsed);
}

export function formatRate(value, language = 'PT', minDigits = 4, maxDigits = 6) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return '';
  return new Intl.NumberFormat(localeFor(language), {
    minimumFractionDigits: minDigits,
    maximumFractionDigits: maxDigits,
  }).format(parsed);
}

export function formatCurrency(value, currency, language = 'PT') {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || !currency) return '--';
  try {
    return new Intl.NumberFormat(localeFor(language), {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(parsed);
  } catch {
    return `${formatNumber(parsed, language, 2)} ${currency}`;
  }
}

export function formatDate(value, language = 'PT') {
  if (!value) return '';
  const date = value instanceof Date ? value : new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return String(value);
  return new Intl.DateTimeFormat(localeFor(language), {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function formatShortDate(value, language = 'PT') {
  if (!value) return '';
  const date = value instanceof Date ? value : new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return String(value);
  return new Intl.DateTimeFormat(localeFor(language), {
    day: '2-digit',
    month: '2-digit',
    timeZone: 'UTC',
  }).format(date);
}

export function formatPercent(value, language = 'PT') {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return '';
  const formatted = new Intl.NumberFormat(localeFor(language), {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(parsed));
  return `${parsed >= 0 ? '+' : '−'}${formatted}%`;
}

export default {
  localeFor,
  formatNumber,
  formatRate,
  formatCurrency,
  formatDate,
  formatShortDate,
  formatPercent,
};
