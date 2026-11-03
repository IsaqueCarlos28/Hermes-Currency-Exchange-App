import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import RatesTableSection from '../RatesTableSection';
import { LABELS } from '../../../../constants/i18n';

vi.mock('../../../../utils/downloadCsv', () => ({ default: vi.fn() }));

const ROWS = [
  { date: '2026-10-15', from: 'USD', to: 'BRL', rate: 5.39 },
  { date: '2026-10-31', from: 'USD', to: 'BRL', rate: 5.41 },
  { date: '2026-11-03', from: 'USD', to: 'BRL', rate: 5.4515 },
];

function renderSection(props = {}) {
  return render(
    <RatesTableSection rates={ROWS} from="USD" to="BRL" resetKey="USD|BRL|30D" {...props} />,
  );
}

function bodyRows() {
  const rowgroups = screen.getAllByRole('rowgroup');
  return within(rowgroups[rowgroups.length - 1]).getAllByRole('row');
}

describe('RatesTableSection', () => {
  it('renders the summary and the table sorted by date descending', () => {
    renderSection();

    expect(
      screen.getByRole('heading', { name: 'Tabela de cotações' }),
    ).toBeInTheDocument();
    expect(screen.getByText('3 de 3 registros')).toBeInTheDocument();

    const rows = bodyRows();
    expect(rows).toHaveLength(3);
    expect(rows[0]).toHaveTextContent('03/11/2026');
    expect(rows[0]).toHaveTextContent('5,4515');
  });

  it('filters the table by rate', async () => {
    const user = userEvent.setup();

    renderSection();

    await user.type(screen.getByLabelText('Cotação mínima'), '5,42');

    expect(screen.getByText('1 de 3 registros')).toBeInTheDocument();
    expect(bodyRows()).toHaveLength(1);
    expect(bodyRows()[0]).toHaveTextContent('03/11/2026');
  });

  it('filters the table by date range', async () => {
    const user = userEvent.setup();

    renderSection();

    await user.type(screen.getByLabelText('Data inicial'), '01/10/2026');
    await user.type(screen.getByLabelText('Data final'), '31/10/2026');

    expect(screen.getByText('2 de 3 registros')).toBeInTheDocument();
  });

  it('shows an error and keeps all rows for an invalid date', async () => {
    const user = userEvent.setup();

    renderSection();

    await user.type(screen.getByLabelText('Data inicial'), '31/02/2026');

    expect(screen.getByText('Use o formato dd/mm/aaaa.')).toBeInTheDocument();
    expect(screen.getByText('3 de 3 registros')).toBeInTheDocument();
  });

  it('shows an error and does not apply an inverted rate range', async () => {
    const user = userEvent.setup();

    renderSection();

    await user.type(screen.getByLabelText('Cotação mínima'), '6');
    await user.type(screen.getByLabelText('Cotação máxima'), '5');

    expect(
      screen.getByText('A cotação mínima deve ser menor que a máxima.'),
    ).toBeInTheDocument();
    expect(screen.getByText('3 de 3 registros')).toBeInTheDocument();
  });

  it('clears the filters', async () => {
    const user = userEvent.setup();

    renderSection();

    const minRate = screen.getByLabelText('Cotação mínima');
    await user.type(minRate, '5,42');
    expect(screen.getByText('1 de 3 registros')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Limpar filtros' }));

    expect(minRate).toHaveValue('');
    expect(screen.getByText('3 de 3 registros')).toBeInTheDocument();
  });

  it('toggles the sort by date and by rate', async () => {
    const user = userEvent.setup();

    renderSection();

    const dateHeader = screen.getByRole('columnheader', { name: 'Data' });
    const rateHeader = screen.getByRole('columnheader', { name: 'Cotação' });

    expect(dateHeader).toHaveAttribute('aria-sort', 'descending');
    expect(rateHeader).toHaveAttribute('aria-sort', 'none');

    await user.click(within(dateHeader).getByRole('button'));

    expect(dateHeader).toHaveAttribute('aria-sort', 'ascending');
    expect(bodyRows()[0]).toHaveTextContent('15/10/2026');

    await user.click(within(rateHeader).getByRole('button'));

    expect(rateHeader).toHaveAttribute('aria-sort', 'descending');
    expect(dateHeader).toHaveAttribute('aria-sort', 'none');
    expect(bodyRows()[0]).toHaveTextContent('03/11/2026');
  });

  it('disables the export and warns when the filters return no rows', async () => {
    const user = userEvent.setup();

    renderSection();

    await user.type(screen.getByLabelText('Cotação mínima'), '9');

    expect(screen.getByText('Nenhum registro para os filtros aplicados')).toBeInTheDocument();
    expect(screen.getAllByText('Sem registros para exportar.')).toHaveLength(2);

    screen.getAllByRole('button', { name: 'Exportar CSV' }).forEach((button) => {
      expect(button).toBeDisabled();
    });
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

  it('renders the empty state when the dataset has no rows', () => {
    renderSection({ rates: [] });

    expect(screen.getByText('Nenhum dado encontrado')).toBeInTheDocument();
    expect(screen.getByText('0 de 0 registros')).toBeInTheDocument();
  });

  it('resets the filters when the reset key changes', async () => {
    const user = userEvent.setup();

    const { rerender } = renderSection();

    await user.type(screen.getByLabelText('Cotação mínima'), '5,42');
    expect(screen.getByText('1 de 3 registros')).toBeInTheDocument();

    rerender(
      <RatesTableSection
        rates={ROWS}
        from="USD"
        to="BRL"
        resetKey="USD|BRL|7D"
      />,
    );

    await waitFor(() => expect(screen.getByText('3 de 3 registros')).toBeInTheDocument());
    expect(screen.getByLabelText('Cotação mínima')).toHaveValue('');
  });

  it('renders the English labels and short date format', () => {
    renderSection({ language: 'EN', labels: LABELS.EN.table });

    expect(screen.getByRole('heading', { name: 'Exchange rates table' })).toBeInTheDocument();
    expect(screen.getByText('3 of 3 records')).toBeInTheDocument();
    expect(bodyRows()[0]).toHaveTextContent('11/03/2026');
  });
});
