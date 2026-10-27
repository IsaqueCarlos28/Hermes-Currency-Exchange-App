import { useEffect, useState } from 'react';

export function useCurrencies() {
  const [currencies, setCurrencies] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  const fetchCurrencies = async () => {
    setStatus('loading');
    setError(null);
    try {
      // Placeholder
      setCurrencies([]);
      setStatus('success');
    } catch (e) {
      setError(e);
      setStatus('error');
    }
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  return { currencies, status, error, retry: fetchCurrencies };
}

export default useCurrencies;
