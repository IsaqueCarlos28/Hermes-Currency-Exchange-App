import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import CurrencyConverter from '../CurrencyConverter';
import { LABELS } from '../../../../constants/i18n';

const baseProps = {
  currencies: ['BRL', 'EUR', 'USD'],
  from: 'USD',
  to: 'BRL',
  amount: '100',
  rate: 5.4515,
  rateDate: '2026-11-03',
  status: 'success',
  converted: 545.15,
};

describe('CurrencyConverter', () => {
  it('renders the controls with the selected pair', () => {
    render(<CurrencyConverter {...baseProps} />);

    expect(screen.getByLabelText('Valor')).toHaveValue('100');
    expect(screen.getByLabelText('Moeda de origem')).toHaveValue('USD');
    expect(screen.getByLabelText('Moeda de destino')).toHaveValue('BRL');
    expect(screen.getByRole('button', { name: 'Converter' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Trocar moedas' })).toBeInTheDocument();
  });

  it('adds pair currencies that are missing from the API list', () => {
    render(<CurrencyConverter {...baseProps} currencies={['BRL']} />);

    const fromSelect = screen.getByLabelText('Moeda de origem');
    const optionValues = within(fromSelect)
      .getAllByRole('option')
      .map((option) => option.value);

    expect(optionValues).toEqual(['USD', 'BRL']);
  });

  it('renders the converted amount and the current rate', () => {
    render(<CurrencyConverter {...baseProps} />);

    expect(screen.getByText('100 USD')).toBeInTheDocument();
    expect(screen.getByText(/R\$/)).toHaveTextContent('545,15');
    expect(screen.getByText('1 USD = 5,4515 BRL')).toBeInTheDocument();
  });

  it('reports currency and amount changes', async () => {
    const user = userEvent.setup();
    const onFromChange = vi.fn();
    const onAmountChange = vi.fn();

    render(
      <CurrencyConverter
        {...baseProps}
        onFromChange={onFromChange}
        onAmountChange={onAmountChange}
      />,
    );

    await user.selectOptions(screen.getByLabelText('Moeda de origem'), 'EUR');
    expect(onFromChange).toHaveBeenCalledWith('EUR');

    await user.type(screen.getByLabelText('Valor'), '5');
    expect(onAmountChange).toHaveBeenLastCalledWith('1005');
  });

  it('calls onSwap from the swap button', async () => {
    const user = userEvent.setup();
    const onSwap = vi.fn();

    render(<CurrencyConverter {...baseProps} onSwap={onSwap} />);

    await user.click(screen.getByRole('button', { name: 'Trocar moedas' }));
    expect(onSwap).toHaveBeenCalledTimes(1);
  });

  it('focuses the amount field when the amount is invalid', async () => {
    const user = userEvent.setup();

    render(
      <CurrencyConverter
        {...baseProps}
        amount=""
        errors={{ amount: 'Informe um valor maior que zero.' }}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Converter' }));

    expect(screen.getByLabelText('Valor')).toHaveFocus();
  });

  it('focuses the source currency when the pair is invalid', async () => {
    const user = userEvent.setup();

    render(
      <CurrencyConverter
        {...baseProps}
        to="USD"
        errors={{ pair: 'Escolha moedas diferentes.' }}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Converter' }));

    expect(screen.getByLabelText('Moeda de origem')).toHaveFocus();
    expect(screen.getByText('Escolha moedas diferentes.')).toBeInTheDocument();
  });

  it('focuses the result region when there is no validation error', async () => {
    const user = userEvent.setup();

    render(<CurrencyConverter {...baseProps} />);

    await user.click(screen.getByRole('button', { name: 'Converter' }));

    const resultRegion = document.querySelector('[aria-live="polite"][tabindex="-1"]');
    expect(resultRegion).toHaveFocus();
  });

  it('disables the selects while the currency list is loading', () => {
    render(<CurrencyConverter {...baseProps} currenciesStatus="loading" />);

    expect(screen.getByLabelText('Moeda de origem')).toBeDisabled();
    expect(screen.getByLabelText('Moeda de destino')).toBeDisabled();
  });

  it('shows the currency error and retries the request', async () => {
    const user = userEvent.setup();
    const onCurrenciesRetry = vi.fn();

    render(
      <CurrencyConverter
        {...baseProps}
        currenciesStatus="error"
        onCurrenciesRetry={onCurrenciesRetry}
      />,
    );

    expect(screen.getByText('Não foi possível carregar a lista de moedas.')).toBeInTheDocument();
    expect(screen.getByLabelText('Moeda de origem')).toBeDisabled();

    await user.click(screen.getByRole('button', { name: 'Tentar novamente' }));
    expect(onCurrenciesRetry).toHaveBeenCalledTimes(1);
  });

  it('renders the English labels when requested', () => {
    render(
      <CurrencyConverter
        {...baseProps}
        language="EN"
        labels={LABELS.EN.converter}
      />,
    );

    expect(screen.getByLabelText('Amount')).toHaveValue('100');
    expect(screen.getByRole('button', { name: 'Convert' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Swap currencies' })).toBeInTheDocument();
  });
});
