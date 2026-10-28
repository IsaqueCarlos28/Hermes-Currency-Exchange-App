import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchLatestRate } from '../services/frankfurterApi';
import { normalizeLatestRate } from '../services/frankfurterAdapters';

const INITIAL_STATE = { rate: null, date: null, from: null, to: null, status: 'idle', error: null };

export function useLatestRate(from, to) {
  const [state, setState] = useState(INITIAL_STATE);
  const [attempt, setAttempt] = useState(0);
  const requestId = useRef(0);

  useEffect(() => {
    if (!from || !to || from === to) {
      requestId.current += 1;
      setState(INITIAL_STATE);
      return undefined;
    }

    const controller = new AbortController();
    const id = requestId.current + 1;
    requestId.current = id;

    setState((current) => ({ ...current, status: 'loading', error: null }));

    fetchLatestRate(from, to, { signal: controller.signal })
      .then((payload) => {
        if (requestId.current !== id) return;

        const normalized = normalizeLatestRate(payload, { from, to });
        if (!normalized) throw new Error('Invalid exchange rate response');

        setState({ ...normalized, status: 'success', error: null });
      })
      .catch((error) => {
        if (controller.signal.aborted || requestId.current !== id) return;
        setState({ ...INITIAL_STATE, status: 'error', error });
      });

    return () => controller.abort();
  }, [from, to, attempt]);

  const retry = useCallback(() => setAttempt((value) => value + 1), []);

  return { ...state, retry };
}

export default useLatestRate;
