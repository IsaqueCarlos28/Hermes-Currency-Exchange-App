import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import ConversionResult from '../ConversionResult';

describe('ConversionResult', () => {
  it('renders the loading skeleton with an accessible message', () => {
    render(<ConversionResult status="loading" from="USD" />);

    expect(screen.getByRole('status')).toHaveTextContent('Convertendo...');
  });

  it('renders the converted amount, rate and quote date', () => {
    render(
      <ConversionResult
        amount="100"
        converted={545.15}
        rate={5.4515}
        rateDate="2026-11-03"
        from="USD"
        to="BRL"
      />,
    );

    expect(screen.getByText('100 USD')).toBeInTheDocument();
    expect(screen.getByText(/R\$/)).toHaveTextContent('545,15');
    expect(screen.getByText('1 USD = 5,4515 BRL')).toBeInTheDocument();
    expect(screen.getByText(/Cotação de/)).toHaveTextContent('03/11/2026');
  });

  it('hides the rate line when the pair is invalid', () => {
    render(<ConversionResult amount="100" converted={100} from="USD" to="USD" rate={1} />);

    expect(screen.queryByText(/^1 USD =/)).not.toBeInTheDocument();
  });

  it('shows placeholders when there is no converted value', () => {
    render(
      <ConversionResult amount="0" invalidAmount from="USD" to="BRL" />,
    );

    expect(screen.getByText('-- USD')).toBeInTheDocument();
    expect(screen.getByText('--')).toBeInTheDocument();
  });

  it('renders an error state and calls the retry handler', async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();

    render(<ConversionResult status="error" onRetry={onRetry} />);

    expect(screen.getByRole('alert')).toHaveTextContent('Não foi possível obter a taxa.');

    await user.click(screen.getByRole('button', { name: 'Tentar novamente' }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('renders English labels and date format when requested', () => {
    render(
      <ConversionResult
        amount="100"
        converted={545.15}
        rate={5.4515}
        rateDate="2026-11-03"
        from="USD"
        to="BRL"
        language="EN"
        labels={{
          converted: 'You converted',
          quote: 'Rate on',
          apiError: 'Could not fetch the exchange rate.',
          retry: 'Try again',
        }}
      />,
    );

    expect(screen.getByText('You converted')).toBeInTheDocument();
    expect(screen.getByText(/Rate on/)).toHaveTextContent('11/03/2026');
    expect(screen.getByText('1 USD = 5.4515 BRL')).toBeInTheDocument();
  });
});
