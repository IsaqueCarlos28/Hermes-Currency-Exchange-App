import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import RateChart from '../RateChart';

const DATA = [
  { date: '2026-11-03', rate: 5.4515 },
  { date: '2026-10-15', rate: 5.39 },
  { date: '2026-10-31', rate: 5.41 },
];

describe('RateChart', () => {
  it('renders an accessible chart with the latest rate tooltip', () => {
    render(<RateChart data={DATA} from="USD" to="BRL" />);

    const chart = screen.getByRole('img');
    expect(chart).toHaveAttribute(
      'aria-label',
      'Gráfico de linha da cotação USD para BRL, de 5,3900 para 5,4515.',
    );
    expect(chart).toHaveTextContent('03/11/2026');
    expect(chart).toHaveTextContent('5,4515');
  });

  it('sorts the data before plotting it', () => {
    render(<RateChart data={DATA} from="USD" to="BRL" />);

    const chart = screen.getByRole('img');
    expect(chart.querySelectorAll('text')).not.toHaveLength(0);
    expect(chart).toHaveTextContent('15/10');
    expect(chart).toHaveTextContent('03/11');
  });

  it('uses the localized chart label when provided', () => {
    render(
      <RateChart
        data={DATA}
        from="USD"
        to="BRL"
        labels={{ chartLabel: (from, to, first, last) => `${from}->${to}: ${first}..${last}` }}
      />,
    );

    expect(screen.getByRole('img')).toHaveAttribute(
      'aria-label',
      'USD->BRL: 5,3900..5,4515',
    );
  });

  it('renders a single point without breaking the geometry', () => {
    render(
      <RateChart data={[{ date: '2026-11-03', rate: 5.4515 }]} from="USD" to="BRL" />,
    );

    expect(screen.getByRole('img')).toHaveTextContent('03/11/2026');
    expect(screen.getByRole('img')).toHaveTextContent('5,4515');
  });

  it('renders no chart for empty data', () => {
    const { container } = render(<RateChart data={[]} from="USD" to="BRL" />);

    expect(container.querySelector('svg')).toBeNull();
  });

  it('ignores points with invalid rates', () => {
    const { container } = render(
      <RateChart
        data={[
          { date: '2026-11-01', rate: 'abc' },
          { date: '2026-11-02', rate: undefined },
        ]}
        from="USD"
        to="BRL"
      />,
    );

    expect(container.querySelector('svg')).toBeNull();
  });

  it('formats the axis and tooltip according to the language', () => {
    render(<RateChart data={DATA} from="USD" to="BRL" language="EN" />);

    const chart = screen.getByRole('img');
    expect(chart).toHaveAttribute(
      'aria-label',
      'Gráfico de linha da cotação USD para BRL, de 5.3900 para 5.4515.',
    );
    expect(chart).toHaveTextContent('11/03/2026');
    expect(chart).toHaveTextContent('5.4515');
  });
});
