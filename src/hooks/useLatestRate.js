import { useEffect, useState } from 'react';

export function useLatestRate(from, to) {
  const [rate, setRate] = useState(null);
  const [date, setDate] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  const fetchRate = async () => {
    setStatus('loading');
    setError(null);
    try {
      setRate(null);
      setDate(null);
      setStatus('success');
    } catch (e) {
      setError(e);
      setStatus('error');
    }
  };

  useEffect(() => {
    if (!from || !to) return;
    fetchRate();
  }, [from, to]);

  return { rate, date, status, error, retry: fetchRate };
}

export default useLatestRate;
