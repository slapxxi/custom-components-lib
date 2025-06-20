import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from '../src/components/Button';

describe('Button', () => {
  it('renders', () => {
    render(<Button />);
    expect(screen.getByTestId('button')).toBeInTheDocument();
  });

  it('renders contained variant', () => {
    render(<Button variant="contained" />);
    expect(screen.getByTestId('button')).toHaveClass('button');
    expect(screen.getByTestId('button')).toHaveClass('buttonContained');
  });

  it('renders outline variant', () => {
    render(<Button variant="outlined" />);
    expect(screen.getByTestId('button')).toHaveClass('button');
    expect(screen.getByTestId('button')).toHaveClass('buttonOutlined');
  });

  it('renders text variant', () => {
    render(<Button variant="text" />);
    expect(screen.getByTestId('button')).toHaveClass('button');
    expect(screen.getByTestId('button')).toHaveClass('buttonText');
  });

  it('renders small variant', () => {
    render(<Button size="small" />);
    expect(screen.getByTestId('button')).toHaveClass('button');
    expect(screen.getByTestId('button')).toHaveClass('buttonSmall');
  });

  it('renders medium variant', () => {
    render(<Button size="medium" />);
    expect(screen.getByTestId('button')).toHaveClass('button');
    expect(screen.getByTestId('button')).toHaveClass('buttonMedium');
  });

  it('renders large variant', () => {
    render(<Button size="large" />);
    expect(screen.getByTestId('button')).toHaveClass('button');
    expect(screen.getByTestId('button')).toHaveClass('buttonLarge');
  });
});
