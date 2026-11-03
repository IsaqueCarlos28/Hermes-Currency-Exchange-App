import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import App from '../App';
import {
  fetchCurrencies,
  fetchHistoricalRates,
  fetchLatestRate,
} from '../services/frankfurterApi';

vi.mock('../services/frankfurterApi', () => ({
  fetchCurrencies: vi.fn(),
  fetchLatestRate: vi.fn(),
  fetchHistoricalRates: vi.fn(),
}));

const RATES = [
  { date: '2026-10-15', rate: 5.39 },
  { date: '2026-10-31', rate: 5.41 },
  { date: '2026-11-03', rate: 5.4515 },
];

function tableBodyRows() {
  const rowgroups = screen.getAllByRole('rowgroup');
  return within(rowgroups[rowgroups.length - 1]).getAllByRole('row');
}

beforeEach(() => {
  vi.clearAllMocks();

  fetchCurrencies.mockResolvedValue([
    { iso_code: 'BRL' },
    { iso_code: 'EUR' },
    { iso_code: 'USD' },
  ]);
  fetchLatestRate.mockResolvedValue({ rate: 5.4515, date: '2026-11-03' });
  fetchHistoricalRates.mockResolvedValue(RATES);
});

describe('App', () => {
  it('loads currencies, the latest rate and the history from the API', async () => {
    render(<App />);

    expect(await screen.findByText(/545,15/)).toBeInTheDocument();
    expect(screen.getByText('1 USD = 5,4515 BRL')).toBeInTheDocument();
    expect(await screen.findByText('3 de 3 registros')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Histórico USD → BRL' }),
    ).toBeInTheDocument();

    expect(fetchCurrencies).toHaveBeenCalledTimes(1);
    expect(fetchLatestRate).toHaveBeenCalledWith(
      'USD',
      'BRL',
      expect.objectContaining({ signal: expect.any(AbortSignal) }),
    );
    expect(fetchHistoricalRates).toHaveBeenCalledWith(
      'USD',
      'BRL',
      expect.any(String),
      expect.any(String),
      expect.objectContaining({ signal: expect.any(AbortSignal) }),
    );
    expect(document.documentElement.lang).toBe('pt-BR');
  });

  it('swaps the pair and reloads the rate and history', async () => {
    const user = userEvent.setup();

    render(<App />);
    await screen.findByText(/545,15/);

    await user.click(screen.getByRole('button', { name: 'Trocar moedas' }));

    await waitFor(() =>
      expect(fetchLatestRate).toHaveBeenLastCalledWith(
        'BRL',
        'USD',
        expect.anything(),
      ),
    );
    expect(fetchHistoricalRates).toHaveBeenLastCalledWith(
      'BRL',
      'USD',
      expect.any(String),
      expect.any(String),
      expect.anything(),
    );
    expect(screen.getByLabelText('Moeda de origem')).toHaveValue('BRL');
    expect(screen.getByLabelText('Moeda de destino')).toHaveValue('USD');
    expect(
      screen.getByRole('heading', { name: 'Histórico BRL → USD' }),
    ).toBeInTheDocument();
  });

  it('blocks the conversion when both currencies are the same', async () => {
    const user = userEvent.setup();

    render(<App />);
    await screen.findByText(/545,15/);

    await user.selectOptions(screen.getByLabelText('Moeda de destino'), 'USD');

    expect(screen.getByText('Escolha moedas diferentes.')).toBeInTheDocument();
    expect(screen.queryByText(/R\$/)).not.toBeInTheDocument();
    expect(fetchLatestRate).toHaveBeenCalledTimes(1);
  });

  it('shows a validation message for an invalid amount', async () => {
    const user = userEvent.setup();

    render(<App />);
    await screen.findByText(/545,15/);

    const amount = screen.getByLabelText('Valor');
    await user.clear(amount);
    await user.type(amount, '0');

    expect(screen.getByText('Informe um valor maior que zero.')).toBeInTheDocument();
    expect(screen.queryByText(/R\$/)).not.toBeInTheDocument();
    expect(screen.getByText('-- USD')).toBeInTheDocument();
  });

  it('switches the interface language and the date format', async () => {
    const user = userEvent.setup();

    render(<App />);
    await screen.findByText('3 de 3 registros');

    await user.click(screen.getByRole('button', { name: 'EN' }));

    expect(document.documentElement.lang).toBe('en');
    expect(
      screen.getByRole('heading', { name: 'Currency converter' }),
    ).toBeInTheDocument();
    expect(screen.getByText('3 of 3 records')).toBeInTheDocument();
    expect(tableBodyRows()[0]).toHaveTextContent('11/03/2026');
  });

  it('clears the table filters when the period changes', async () => {
    const user = userEvent.setup();

    render(<App />);
    await screen.findByText('3 de 3 registros');

    await user.type(screen.getByLabelText('Cotação mínima'), '5,45');
    expect(await screen.findByText('1 de 3 registros')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '7D' }));

    expect(await screen.findByText('3 de 3 registros')).toBeInTheDocument();
    expect(screen.getByLabelText('Cotação mínima')).toHaveValue('');
    expect(fetchHistoricalRates).toHaveBeenLastCalledWith(
      'USD',
      'BRL',
      expect.any(String),
      expect.any(String),
      expect.anything(),
    );
  });

  it('shows the empty state when the API has no history for the pair', async () => {
    fetchHistoricalRates.mockResolvedValue([]);

    render(<App />);

    expect(await screen.findByText('0 de 0 registros')).toBeInTheDocument();
    expect((await screen.findAllByText('Nenhum dado encontrado')).length).toBeGreaterThan(0);
  });

  it('shows an error and retries the latest rate request', async () => {
    const user = userEvent.setup();
    fetchLatestRate.mockRejectedValue(new Error('offline'));

    render(<App />);

    expect(
      await screen.findByText('Não foi possível obter a taxa.'),
    ).toBeInTheDocument();

    fetchLatestRate.mockResolvedValue({ rate: 5.4515, date: '2026-11-03' });
    await user.click(screen.getByRole('button', { name: 'Tentar novamente' }));

    expect(await screen.findByText(/545,15/)).toBeInTheDocument();
    expect(fetchLatestRate).toHaveBeenCalledTimes(2);
  });
});
