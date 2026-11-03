import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import HistorySection from '../HistorySection';
import { LABELS } from '../../../../constants/i18n';

const PERIODS = ['7D', '15D', '30D', '3M', '6M', '1A', '5A', '10A'].map((value) => ({
  value,
  label: value,
}));

const RATES = [
  { date: '2026-10-15', rate: 5.39 },
  { date: '2026-10-31', rate: 5.41 },
  { date: '2026-11-03', rate: 5.45 },
];

const DECREASING_RATES = [
  { date: '2026-10-15', rate: 5.45 },
  { date: '2026-11-03', rate: 5.39 },
];

function renderSection(props = {}) {
  return render(
    <HistorySection
      period="30D"
      periods={PERIODS}
      rates={RATES}
      from="USD"
      to="BRL"
      {...props}
    />,
  );
}

describe('HistorySection', () => {
  it('renders the title and all eight periods with the active one marked', () => {
    renderSection();

    expect(
      screen.getByRole('heading', { name: 'Histórico USD → BRL' }),
    ).toBeInTheDocument();

    const group = screen.getByRole('group', { name: 'Período' });
    expect(within(group).getAllByRole('button')).toHaveLength(8);
    expect(within(group).getByRole('button', { name: '30D' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  it('shows the positive variation and the selected period', () => {
    renderSection();

    expect(screen.getByText('+1,11%')).toBeInTheDocument();
    expect(screen.getByText(/nos últimos/)).toHaveTextContent('30 dias');
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('shows a negative variation when the rate falls', () => {
    renderSection({ rates: DECREASING_RATES });

    expect(screen.getByText('−1,10%')).toBeInTheDocument();
  });

  it('changes the period through the selector', async () => {
    const user = userEvent.setup();
    const onPeriodChange = vi.fn();

    renderSection({ onPeriodChange });

    await user.click(screen.getByRole('button', { name: '7D' }));
    expect(onPeriodChange).toHaveBeenCalledWith('7D');
  });

  it('renders the loading state', () => {
    renderSection({ status: 'loading' });

    expect(screen.getByRole('status')).toHaveTextContent('Carregando cotações...');
  });

  it('renders the error state and retries', async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();

    renderSection({ status: 'error', onRetry });

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Não foi possível carregar as cotações.',
    );

    await user.click(screen.getByRole('button', { name: 'Tentar novamente' }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('renders the empty state when there is no published rate', () => {
    renderSection({ rates: [] });

    expect(screen.getByRole('status')).toHaveTextContent('Nenhum dado encontrado');
    expect(
      screen.getByText('Não há cotações publicadas para este par e período.'),
    ).toBeInTheDocument();
  });

  it('renders the English labels and percentages', () => {
    renderSection({ language: 'EN', labels: LABELS.EN.history, period: '7D' });

    expect(screen.getByRole('heading', { name: 'USD → BRL history' })).toBeInTheDocument();
    expect(screen.getByText('+1.11%')).toBeInTheDocument();
    expect(screen.getByText(/over the last/)).toHaveTextContent('7 days');
  });
});
