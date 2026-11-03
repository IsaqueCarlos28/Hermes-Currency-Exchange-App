import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import useCurrencies from '../useCurrencies';
import { fetchCurrencies } from '../../services/frankfurterApi';

vi.mock('../../services/frankfurterApi', () => ({
  fetchCurrencies: vi.fn(),
}));

describe('useCurrencies', () => {
  beforeEach(() => {
    fetchCurrencies.mockReset();
  });

  it('loads and normalizes the currency list', async () => {
    fetchCurrencies.mockResolvedValue([
      { iso_code: 'USD' },
      { iso_code: 'BRL' },
      { iso_code: 'USD' },
    ]);

    const { result } = renderHook(() => useCurrencies());

    expect(result.current.status).toBe('loading');
    await waitFor(() => expect(result.current.status).toBe('success'));
    expect(result.current.currencies).toEqual(['BRL', 'USD']);
    expect(result.current.error).toBeNull();
  });

  it('exposes an error when the request fails', async () => {
    const error = new Error('network down');
    fetchCurrencies.mockRejectedValue(error);

    const { result } = renderHook(() => useCurrencies());

    await waitFor(() => expect(result.current.status).toBe('error'));
    expect(result.current.error).toBe(error);
    expect(result.current.currencies).toEqual([]);
  });

  it('retries the request', async () => {
    fetchCurrencies
      .mockRejectedValueOnce(new Error('first failure'))
      .mockResolvedValueOnce([{ iso_code: 'EUR' }]);

    const { result } = renderHook(() => useCurrencies());
    await waitFor(() => expect(result.current.status).toBe('error'));

    act(() => result.current.retry());

    await waitFor(() => expect(result.current.status).toBe('success'));
    expect(result.current.currencies).toEqual(['EUR']);
    expect(fetchCurrencies).toHaveBeenCalledTimes(2);
  });

  it('aborts the request on unmount', () => {
    let signal;
    fetchCurrencies.mockImplementation(({ signal: requestSignal }) => {
      signal = requestSignal;
      return new Promise(() => {});
    });

    const { unmount } = renderHook(() => useCurrencies());
    unmount();

    expect(signal.aborted).toBe(true);
  });
});
