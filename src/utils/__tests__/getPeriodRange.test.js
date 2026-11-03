import { afterEach, describe, expect, it, vi } from 'vitest';
import getPeriodRange from '../getPeriodRange';

afterEach(() => {
  vi.useRealTimers();
});

function daysBetween(startDate, endDate) {
  return (Date.parse(endDate) - Date.parse(startDate)) / 86_400_000;
}

describe('getPeriodRange', () => {
  it('returns ISO dates for every supported period', () => {
    ['7D', '15D', '30D', '3M', '6M', '1A', '5A', '10A'].forEach((period) => {
      const { startDate, endDate } = getPeriodRange(period);
      expect(startDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(endDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Date.parse(startDate)).toBeLessThanOrEqual(Date.parse(endDate));
    });
  });

  it('uses the expected number of days for each period', () => {
    expect(daysBetween(...Object.values(getPeriodRange('7D')))).toBe(7);
    expect(daysBetween(...Object.values(getPeriodRange('30D')))).toBe(30);
    expect(daysBetween(...Object.values(getPeriodRange('1A')))).toBe(365);
    expect(daysBetween(...Object.values(getPeriodRange('10A')))).toBe(3650);
  });

  it('falls back to 30 days for an unknown period', () => {
    expect(daysBetween(...Object.values(getPeriodRange('unknown')))).toBe(30);
  });

  it('returns the current local date as the end date', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 10, 3, 12, 0, 0));

    expect(getPeriodRange('7D').endDate).toBe('2026-11-03');
  });
});
