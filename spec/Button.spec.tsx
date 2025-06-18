import React from 'react';
import { render } from '@testing-library/react';
import { Button } from '../src/components/Button';

describe('Button', () => {
  it('renders', () => {
    const { getByTestId } = render(<Button />);
    expect(getByTestId('button')).toBeInTheDocument();
  });

  it('has default classes', () => {
    const { getByTestId } = render(<Button />);
    expect(getByTestId('button')).toHaveClass(
      'button buttonContained buttonMedium'
    );
  });

  it('renders contained variant', () => {
    const { getByTestId } = render(<Button variant="contained" />);
    expect(getByTestId('button')).toHaveClass('button');
    expect(getByTestId('button')).toHaveClass('buttonContained');
  });

  it('renders outline variant', () => {
    const { getByTestId } = render(<Button variant="outlined" />);
    expect(getByTestId('button')).toHaveClass('button');
    expect(getByTestId('button')).toHaveClass('buttonOutlined');
  });

  it('renders text variant', () => {
    const { getByTestId } = render(<Button variant="text" />);
    expect(getByTestId('button')).toHaveClass('button');
    expect(getByTestId('button')).toHaveClass('buttonText');
  });

  it('renders small variant', () => {
    const { getByTestId } = render(<Button size="small" />);
    expect(getByTestId('button')).toHaveClass('button');
    expect(getByTestId('button')).toHaveClass('buttonSmall');
  });

  it('renders medium variant', () => {
    const { getByTestId } = render(<Button size="medium" />);
    expect(getByTestId('button')).toHaveClass('button');
    expect(getByTestId('button')).toHaveClass('buttonMedium');
  });

  it('renders large variant', () => {
    const { getByTestId } = render(<Button size="large" />);
    expect(getByTestId('button')).toHaveClass('button');
    expect(getByTestId('button')).toHaveClass('buttonLarge');
  });
});
