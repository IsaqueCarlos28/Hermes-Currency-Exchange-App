export function formatDate(date, locale = 'pt-BR') {
  if (!date) return '';
  try {
    return new Date(date).toLocaleDateString(locale);
  } catch {
    return date;
  }
}

export function formatNumber(num, locale = 'pt-BR') {
  if (num === null || num === undefined) return '';
  try {
    return Number(num).toLocaleString(locale);
  } catch {
    return String(num);
  }
}

export default { formatDate, formatNumber };
