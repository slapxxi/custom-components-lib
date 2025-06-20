import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextField } from '../src/components/TextField';

describe('TextField', () => {
  it('renders', () => {
    render(<TextField />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('accepts "label" prop', () => {
    render(<TextField label="My Text" />);
    expect(screen.getByTestId('label')).toHaveTextContent(/^My Text$/);
  });

  it('accepts "error" prop', () => {
    render(<TextField error="My Error" />);
    expect(screen.getByTestId('label')).toHaveTextContent(/^Error$/);
    expect(screen.getByTestId('error')).toHaveTextContent(/^My Error$/);
  });

  it('accepts "value" prop', () => {
    render(<TextField value="My Value" onChange={() => {}} />);
    expect(screen.getByRole('textbox')).toHaveValue('My Value');
  });

  it('accepts "onChange" prop', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(
      <TextField onChange={(e) => onChange(e.target.value)} value="My Value" />
    );
    const input = screen.getByRole('textbox');
    await user.type(input, 'H');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('My ValueH');
  });
});
