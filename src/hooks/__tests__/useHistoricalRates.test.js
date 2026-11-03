import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import useHistoricalRates from '../useHistoricalRates';
import { fetchHistoricalRates } from '../../services/frankfurterApi';
import { getPeriodRange } from '../../utils/getPeriodRange';

vi.mock('../../services/frankfurterApi', () => ({
  fetchHistoricalRates: vi.fn(),
}));

describe('useHistoricalRates', () => {
  beforeEach(() => {
    fetchHistoricalRates.mockReset();
  });

  it('loads and normalizes the historical rates', async () => {
    fetchHistoricalRates.mockResolvedValue([
      { date: '2026-11-03', rate: '5.4515' },
      { date: '2026-11-02', rate: 5.4277 },
    ]);

    const { result } = renderHook(() => useHistoricalRates('USD', 'BRL', '30D'));

    expect(result.current.status).toBe('loading');
    await waitFor(() => expect(result.current.status).toBe('success'));
    expect(result.current.rates).toEqual([
      { date: '2026-11-02', rate: 5.4277 },
      { date: '2026-11-03', rate: 5.4515 },
    ]);
  });

  it('requests the range for the selected period', async () => {
    const { startDate, endDate } = getPeriodRange('30D');
    fetchHistoricalRates.mockResolvedValue([]);

    renderHook(() => useHistoricalRates('USD', 'BRL', '30D'));

    await waitFor(() => {
      expect(fetchHistoricalRates).toHaveBeenCalledWith(
        'USD',
        'BRL',
        startDate,
        endDate,
        expect.objectContaining({ signal: expect.any(AbortSignal) }),
      );
    });
  });

  it('returns an empty successful result for identical currencies', () => {
    const { result } = renderHook(() => useHistoricalRates('USD', 'USD', '30D'));

    expect(result.current.status).toBe('success');
    expect(result.current.rates).toEqual([]);
    expect(fetchHistoricalRates).not.toHaveBeenCalled();
  });

  it('retries after a failed request', async () => {
    fetchHistoricalRates
      .mockRejectedValueOnce(new Error('offline'))
      .mockResolvedValueOnce([{ date: '2026-11-03', rate: 5.45 }]);

    const { result } = renderHook(() => useHistoricalRates('USD', 'BRL', '30D'));
    await waitFor(() => expect(result.current.status).toBe('error'));

    act(() => result.current.retry());

    await waitFor(() => expect(result.current.status).toBe('success'));
    expect(result.current.rates).toEqual([{ date: '2026-11-03', rate: 5.45 }]);
    expect(fetchHistoricalRates).toHaveBeenCalledTimes(2);
  });

  it('aborts the request on unmount', () => {
    let signal;
    fetchHistoricalRates.mockImplementation((from, to, startDate, endDate, options) => {
      signal = options.signal;
      return new Promise(() => {});
    });

    const { unmount } = renderHook(() => useHistoricalRates('USD', 'BRL', '30D'));
    unmount();

    expect(signal.aborted).toBe(true);
  });
});
