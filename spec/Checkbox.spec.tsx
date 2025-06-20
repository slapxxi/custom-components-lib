import React from 'react';
import { render, screen } from '@testing-library/react';
import { Checkbox } from '../src/components/Checkbox';

describe('Checkbox', () => {
  it('renders', () => {
    render(<Checkbox />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('accepts "checked" prop', () => {
    render(<Checkbox checked />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('accepts "disabled" prop', () => {
    render(<Checkbox disabled />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
  });

  it('accepts "onChange" prop', () => {
    const onChange = jest.fn();
    render(<Checkbox onChange={onChange} />);
    const checkbox = screen.getByRole('checkbox');
    checkbox.click();
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('negates "checked" prop', () => {
    const onChange = jest.fn();
    render(<Checkbox checked={true} onChange={onChange} />);
    const checkbox = screen.getByRole('checkbox');
    checkbox.click();
    expect(onChange).toHaveBeenCalledWith(false);
  });

  it('does not call "onChange" if disabled', () => {
    const onChange = jest.fn();
    render(<Checkbox disabled onChange={onChange} />);
    const checkbox = screen.getByRole('checkbox');
    checkbox.click();
    expect(onChange).not.toHaveBeenCalled();
  });
});
