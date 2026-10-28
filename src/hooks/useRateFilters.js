import { useEffect, useMemo, useState } from 'react';
import filterRates, { EMPTY_FILTERS, validateFilters } from '../utils/filterRates';
import sortRates from '../utils/sortRates';

export function useRateFilters(rates = [], messages) {
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [sort, setSort] = useState({ field: 'date', direction: 'desc' });

  // Reinicia filtros e ordenação quando os dados carregados mudam (RN-11).
  useEffect(() => {
    setFilters(EMPTY_FILTERS);
    setSort({ field: 'date', direction: 'desc' });
  }, [rates]);

  const errors = useMemo(() => validateFilters(filters, messages), [filters, messages]);

  const filteredRows = useMemo(
    () => sortRates(filterRates(rates, filters), sort),
    [rates, filters, sort],
  );

  const clearFilters = () => setFilters(EMPTY_FILTERS);

  const toggleSort = (field) => {
    setSort((current) => {
      if (current.field !== field) return { field, direction: 'desc' };
      return { field, direction: current.direction === 'desc' ? 'asc' : 'desc' };
    });
  };

  const hasFilters = Object.values(filters).some((value) => value !== '');

  return {
    filters,
    setFilters,
    errors,
    hasFilters,
    clearFilters,
    sort,
    toggleSort,
    filteredRows,
  };
}

export default useRateFilters;
