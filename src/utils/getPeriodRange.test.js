import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import getPeriodRange from './getPeriodRange';

describe('getPeriodRange', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-10-27T12:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('gera o intervalo ISO de cada período', () => {
    expect(getPeriodRange('7D')).toEqual({ startDate: '2026-10-20', endDate: '2026-10-27' });
    expect(getPeriodRange('15D')).toEqual({ startDate: '2026-10-12', endDate: '2026-10-27' });
    expect(getPeriodRange('30D')).toEqual({ startDate: '2026-09-27', endDate: '2026-10-27' });
    expect(getPeriodRange('3M')).toEqual({ startDate: '2026-07-29', endDate: '2026-10-27' });
    expect(getPeriodRange('6M')).toEqual({ startDate: '2026-04-30', endDate: '2026-10-27' });
    expect(getPeriodRange('1A')).toEqual({ startDate: '2025-10-27', endDate: '2026-10-27' });
    expect(getPeriodRange('5A')).toEqual({ startDate: '2021-10-28', endDate: '2026-10-27' });
    expect(getPeriodRange('10A')).toEqual({ startDate: '2016-10-29', endDate: '2026-10-27' });
  });

  it('usa 30 dias como padrão', () => {
    expect(getPeriodRange()).toEqual({ startDate: '2026-09-27', endDate: '2026-10-27' });
    expect(getPeriodRange('XX')).toEqual({ startDate: '2026-09-27', endDate: '2026-10-27' });
  });

  it('preenche mês e dia com zero à esquerda', () => {
    vi.setSystemTime(new Date('2026-03-05T12:00:00Z'));
    expect(getPeriodRange('7D')).toEqual({ startDate: '2026-02-26', endDate: '2026-03-05' });
  });
});
