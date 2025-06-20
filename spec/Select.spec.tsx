import React from 'react';
import { render, screen } from '@testing-library/react';
import { Select, SelectItem } from '../src/components/Select';

describe('Select', () => {
  it('renders', () => {
    render(
      <Select label="Default">
        <SelectItem value="item">Item</SelectItem>
      </Select>
    );
    expect(screen.getAllByText('Default')).not.toHaveLength(0);
  });

  it('displays children', () => {
    render(
      <Select label="Default">
        <SelectItem value="one">One</SelectItem>
        <SelectItem value="two">Two</SelectItem>
        <SelectItem value="three">Three</SelectItem>
      </Select>
    );
    const menu = screen.getByTestId('menu');
    expect(menu).toBeInTheDocument();
    expect(menu.children).toHaveLength(3);
    expect(menu.children[0]).toHaveTextContent(/^One$/);
    expect(menu.children[1]).toHaveTextContent(/^Two$/);
    expect(menu.children[2]).toHaveTextContent(/^Three$/);
  });

  it('displays label', () => {
    render(
      <Select label="Select">
        <SelectItem value="item">First Item</SelectItem>
      </Select>
    );
    expect(screen.getByTestId('label')).toHaveTextContent(/^Select$/);
  });

  it('displays label as output by default', () => {
    render(
      <Select label="Select">
        <SelectItem value="item">First Item</SelectItem>
      </Select>
    );
    expect(screen.getByTestId('output')).toHaveTextContent(/^Select$/);
  });

  it('accepts "value" prop', () => {
    render(
      <Select label="Select" value="item">
        <SelectItem value="item">First Item</SelectItem>
      </Select>
    );
    expect(screen.getByTestId('output')).toHaveTextContent(/^First Item$/);
  });
});
