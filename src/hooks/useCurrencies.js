import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchCurrencies } from '../services/frankfurterApi';
import { normalizeCurrencies } from '../services/frankfurterAdapters';

const INITIAL_STATE = { currencies: [], status: 'idle', error: null };

export function useCurrencies() {
  const [state, setState] = useState(INITIAL_STATE);
  const [attempt, setAttempt] = useState(0);
  const requestId = useRef(0);

  useEffect(() => {
    const controller = new AbortController();
    const id = requestId.current + 1;
    requestId.current = id;

    setState((current) => ({ ...current, status: 'loading', error: null }));

    fetchCurrencies({ signal: controller.signal })
      .then((payload) => {
        if (requestId.current !== id) return;
        setState({
          currencies: normalizeCurrencies(payload),
          status: 'success',
          error: null,
        });
      })
      .catch((error) => {
        if (controller.signal.aborted || requestId.current !== id) return;
        setState({ currencies: [], status: 'error', error });
      });

    return () => controller.abort();
  }, [attempt]);

  const retry = useCallback(() => setAttempt((value) => value + 1), []);

  return { ...state, retry };
}

export default useCurrencies;
