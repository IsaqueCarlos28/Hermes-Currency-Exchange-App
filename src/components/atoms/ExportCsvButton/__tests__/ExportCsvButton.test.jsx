import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import ExportCsvButton from '../ExportCsvButton';
import downloadCsv from '../../../../utils/downloadCsv';
import { LABELS } from '../../../../constants/i18n';

vi.mock('../../../../utils/downloadCsv', () => ({ default: vi.fn() }));

const ROWS = [{ date: '2026-11-03', from: 'USD', to: 'BRL', rate: 5.4515 }];

describe('ExportCsvButton', () => {
  it('exports the rows with localized headers, BOM and semicolons', async () => {
    const user = userEvent.setup();

    render(<ExportCsvButton rows={ROWS} from="USD" to="BRL" />);

    await user.click(screen.getByRole('button', { name: 'Exportar CSV' }));

    expect(downloadCsv).toHaveBeenCalledWith(
      'hermes-USD-BRL.csv',
      '\uFEFFData;Origem;Destino;Cotação\r\n03/11/2026;USD;BRL;5,4515',
    );
  });

  it('uses the English labels and date format', async () => {
    const user = userEvent.setup();

    render(
      <ExportCsvButton
        rows={ROWS}
        from="USD"
        to="BRL"
        language="EN"
        labels={LABELS.EN.table}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Export CSV' }));

    expect(downloadCsv).toHaveBeenCalledWith(
      'hermes-USD-BRL.csv',
      '\uFEFFDate;From;To;Rate\r\n11/03/2026;USD;BRL;5.4515',
    );
  });

  it('is disabled and does not download when there are no rows', async () => {
    const user = userEvent.setup();

    render(<ExportCsvButton rows={[]} from="USD" to="BRL" />);

    const button = screen.getByRole('button', { name: 'Exportar CSV' });
    expect(button).toBeDisabled();

    await user.click(button);
    expect(downloadCsv).not.toHaveBeenCalled();
  });

  it('honors the disabled prop even with rows', async () => {
    const user = userEvent.setup();

    render(<ExportCsvButton rows={ROWS} from="USD" to="BRL" disabled />);

    const button = screen.getByRole('button', { name: 'Exportar CSV' });
    expect(button).toBeDisabled();

    await user.click(button);
    expect(downloadCsv).not.toHaveBeenCalled();
  });
});
