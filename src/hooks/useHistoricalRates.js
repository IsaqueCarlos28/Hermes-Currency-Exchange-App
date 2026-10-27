import { useEffect, useState } from 'react';

export function useHistoricalRates(from, to, period) {
  const [rates, setRates] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  const fetchRates = async () => {
    setStatus('loading');
    setError(null);
    try {
      setRates([]);
      setStatus('success');
    } catch (e) {
      setError(e);
      setStatus('error');
    }
  };

  useEffect(() => {
    if (!from || !to || !period) return;
    fetchRates();
  }, [from, to, period]);

  return { rates, status, error, retry: fetchRates };
}

export default useHistoricalRates;
