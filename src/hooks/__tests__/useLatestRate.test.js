import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import useLatestRate from '../useLatestRate';
import { fetchLatestRate } from '../../services/frankfurterApi';

vi.mock('../../services/frankfurterApi', () => ({
  fetchLatestRate: vi.fn(),
}));

describe('useLatestRate', () => {
  beforeEach(() => {
    fetchLatestRate.mockReset();
  });

  it('loads and normalizes the latest rate', async () => {
    fetchLatestRate.mockResolvedValue({ rate: '5.4515', date: '2026-11-03' });

    const { result } = renderHook(() => useLatestRate('USD', 'BRL'));

    expect(result.current.status).toBe('loading');
    await waitFor(() => expect(result.current.status).toBe('success'));
    expect(result.current.rate).toBe(5.4515);
    expect(result.current.date).toBe('2026-11-03');
  });

  it('does not request a rate when the currencies are the same', () => {
    const { result } = renderHook(() => useLatestRate('USD', 'USD'));

    expect(result.current.status).toBe('idle');
    expect(result.current.rate).toBeNull();
    expect(fetchLatestRate).not.toHaveBeenCalled();
  });

  it('treats an invalid payload as an error', async () => {
    fetchLatestRate.mockResolvedValue({ date: '2026-11-03' });

    const { result } = renderHook(() => useLatestRate('USD', 'BRL'));

    await waitFor(() => expect(result.current.status).toBe('error'));
    expect(result.current.rate).toBeNull();
  });

  it('retries after a failed request', async () => {
    fetchLatestRate
      .mockRejectedValueOnce(new Error('offline'))
      .mockResolvedValueOnce({ rate: 5.4, date: '2026-11-03' });

    const { result } = renderHook(() => useLatestRate('USD', 'BRL'));
    await waitFor(() => expect(result.current.status).toBe('error'));

    act(() => result.current.retry());

    await waitFor(() => expect(result.current.status).toBe('success'));
    expect(result.current.rate).toBe(5.4);
    expect(fetchLatestRate).toHaveBeenCalledTimes(2);
  });

  it('aborts the previous request when the pair changes', async () => {
    const signals = [];
    fetchLatestRate.mockImplementation((from, to, { signal }) => {
      signals.push(signal);
      return new Promise(() => {});
    });

    const { rerender } = renderHook(({ from, to }) => useLatestRate(from, to), {
      initialProps: { from: 'USD', to: 'BRL' },
    });

    rerender({ from: 'USD', to: 'EUR' });

    expect(signals).toHaveLength(2);
    expect(signals[0].aborted).toBe(true);
    expect(signals[1].aborted).toBe(false);
  });
});
