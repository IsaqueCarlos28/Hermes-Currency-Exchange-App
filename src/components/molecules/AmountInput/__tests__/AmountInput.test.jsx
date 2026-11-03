import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import AmountInput from '../AmountInput';

function ControlledAmount({ onChange = () => {}, ...props }) {
  const [value, setValue] = useState('');
  return (
    <AmountInput
      {...props}
      value={value}
      onChange={(next) => {
        setValue(next);
        onChange(next);
      }}
    />
  );
}

describe('AmountInput', () => {
  it('renders the label, placeholder and typed value', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<ControlledAmount onChange={onChange} placeholder="0,00" />);

    const input = screen.getByLabelText('Valor');
    expect(input).toHaveAttribute('placeholder', '0,00');
    expect(input).toHaveAttribute('inputmode', 'decimal');

    await user.type(input, '10,5');

    expect(input).toHaveValue('10,5');
    expect(onChange).toHaveBeenLastCalledWith('10,5');
  });

  it('shows the validation message and links it to the input', () => {
    render(
      <AmountInput
        value=""
        onChange={() => {}}
        label="Valor"
        error="Informe um valor maior que zero."
      />,
    );

    const input = screen.getByLabelText('Valor');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('Informe um valor maior que zero.');
    expect(screen.getByRole('alert')).toHaveTextContent('Informe um valor maior que zero.');
  });
});
