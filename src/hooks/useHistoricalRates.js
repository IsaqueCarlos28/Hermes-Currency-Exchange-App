import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchHistoricalRates } from '../services/frankfurterApi';
import { normalizeHistoricalRates } from '../services/frankfurterAdapters';
import { getPeriodRange } from '../utils/getPeriodRange';

const INITIAL_STATE = { rates: [], status: 'idle', error: null };

export function useHistoricalRates(from, to, period) {
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

    const { startDate, endDate } = getPeriodRange(period);

    setState((current) => ({ ...current, status: 'loading', error: null }));

    fetchHistoricalRates(from, to, startDate, endDate, { signal: controller.signal })
      .then((payload) => {
        if (requestId.current !== id) return;
        setState({
          rates: normalizeHistoricalRates(payload, { from, to }),
          status: 'success',
          error: null,
        });
      })
      .catch((error) => {
        if (controller.signal.aborted || requestId.current !== id) return;
        setState({ rates: [], status: 'error', error });
      });

    return () => controller.abort();
  }, [from, to, period, attempt]);

  const retry = useCallback(() => setAttempt((value) => value + 1), []);

  return { ...state, retry };
}

export default useHistoricalRates;
