export function sortRates(rates = [], sort = { field: 'date', direction: 'desc' }) {
  const { field = 'date', direction = 'desc' } = sort || {};
  const factor = direction === 'asc' ? 1 : -1;

  return [...rates].sort((a, b) => {
    if (field === 'rate') {
      return (Number(a.rate) - Number(b.rate)) * factor;
    }
    return String(a.date).localeCompare(String(b.date)) * factor;
  });
}

export default sortRates;
