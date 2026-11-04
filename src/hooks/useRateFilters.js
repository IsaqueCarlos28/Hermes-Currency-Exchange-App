import { useEffect, useMemo, useState } from 'react';
import filterRates, { EMPTY_FILTERS, validateFilters } from '../utils/filterRates';
import sortRates from '../utils/sortRates';

export function useRateFilters(rates = [], messages, language = 'PT') {
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [sort, setSort] = useState({ field: 'date', direction: 'desc' });

  // Reinicia filtros e ordenação quando os dados carregados mudam (RN-11).
  useEffect(() => {
    setFilters(EMPTY_FILTERS);
    setSort({ field: 'date', direction: 'desc' });
  }, [rates]);

  const errors = useMemo(
    () => validateFilters(filters, messages, language),
    [filters, messages, language],
  );

  const filteredRows = useMemo(
    () => sortRates(filterRates(rates, filters, language), sort),
    [rates, filters, sort, language],
  );

  const clearFilters = () => setFilters(EMPTY_FILTERS);

  const toggleSort = (field) => {
    setSort((current) => {
      if (current.field !== field) return { field, direction: 'desc' };
      return { field, direction: current.direction === 'desc' ? 'asc' : 'desc' };
    });
  };

  return {
    filters,
    setFilters,
    errors,
    clearFilters,
    sort,
    toggleSort,
    filteredRows,
  };
}

export default useRateFilters;
