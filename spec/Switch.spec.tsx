import React from 'react';
import { render } from '@testing-library/react';
import { Switch } from '../src/components/Switch';

describe('Switch', () => {
  it('renders', () => {
    const { getByTestId } = render(<Switch />);
    expect(getByTestId('switch')).toBeInTheDocument();
  });

  it('has default classes', () => {
    const { getByTestId } = render(<Switch />);
    expect(getByTestId('switch')).toHaveClass('container');
    expect(getByTestId('switch')).not.toHaveClass('containerChecked');
    expect(getByTestId('switch')).not.toHaveClass('containerDisabled');
  });
});
