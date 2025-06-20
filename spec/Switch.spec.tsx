import React from 'react';
import { render, screen } from '@testing-library/react';
import { Switch } from '../src/components/Switch';

describe('Switch', () => {
  it('renders', () => {
    render(<Switch />);
    expect(screen.getByTestId('switch')).toBeInTheDocument();
  });

  it('has default classes', () => {
    render(<Switch />);
    expect(screen.getByTestId('switch')).toHaveClass('container');
    expect(screen.getByTestId('switch')).not.toHaveClass('containerChecked');
    expect(screen.getByTestId('switch')).not.toHaveClass('containerDisabled');
  });

  it('accepts "checked" prop', () => {
    render(<Switch checked />);
    expect(screen.getByTestId('switch')).toHaveClass('containerChecked');
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('accepts "disabled" prop', () => {
    render(<Switch disabled />);
    const switchElement = screen.getByTestId('switch');
    expect(switchElement).toHaveClass('containerDisabled');
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('accepts "onChange" prop', () => {
    const onChange = jest.fn();
    render(<Switch onChange={onChange} />);
    screen.getByTestId('switch').click();
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(true);
  });
});
