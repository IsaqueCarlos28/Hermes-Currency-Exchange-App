import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import CurrencySelect from '../CurrencySelect';

describe('CurrencySelect', () => {
  it('renders options and reports changes', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <CurrencySelect
        id="from"
        label="Moeda de origem"
        value="USD"
        options={['BRL', 'EUR', 'USD']}
        onChange={onChange}
      />,
    );

    const select = screen.getByLabelText('Moeda de origem');
    expect(select).toHaveValue('USD');
    expect(screen.getAllByRole('option')).toHaveLength(3);

    await user.selectOptions(select, 'EUR');
    expect(onChange).toHaveBeenCalledWith('EUR');
  });

  it('can be disabled while the currency list is unavailable', () => {
    render(
      <CurrencySelect
        id="to"
        label="Moeda de destino"
        value="BRL"
        options={['BRL']}
        onChange={() => {}}
        disabled
      />,
    );

    expect(screen.getByLabelText('Moeda de destino')).toBeDisabled();
  });

  it('shows an error message when requested', () => {
    render(
      <CurrencySelect
        id="from"
        label="Moeda de origem"
        value="USD"
        options={['USD']}
        onChange={() => {}}
        error="Escolha moedas diferentes."
      />,
    );

    expect(screen.getByLabelText('Moeda de origem')).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('alert')).toHaveTextContent('Escolha moedas diferentes.');
  });

  it('can suppress the error message while keeping the invalid state', () => {
    render(
      <CurrencySelect
        id="from"
        label="Moeda de origem"
        value="USD"
        options={['USD']}
        onChange={() => {}}
        error="Escolha moedas diferentes."
        showErrorMessage={false}
      />,
    );

    expect(screen.getByLabelText('Moeda de origem')).toHaveAttribute('aria-invalid', 'true');
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
