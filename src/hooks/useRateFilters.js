import { useMemo, useState } from 'react';

export function useRateFilters(rates = []) {
  const [filters, setFilters] = useState({ startDate: '', endDate: '', minRate: '', maxRate: '' });
  const [sort, setSort] = useState({ field: 'date', direction: 'desc' });
  const [errors, setErrors] = useState({});

  const clearFilters = () => {
    setFilters({ startDate: '', endDate: '', minRate: '', maxRate: '' });
    setErrors({});
  };

  const filteredRows = useMemo(() => {
    // Placeholder - implement actual filtering/sorting later
    return rates;
  }, [rates, filters, sort]);

  return { filters, setFilters, clearFilters, sort, setSort, filteredRows, errors };
}

export default useRateFilters;
