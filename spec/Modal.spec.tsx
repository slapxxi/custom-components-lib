import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from '../src/components/Modal';

describe('Modal', () => {
  it('renders', () => {
    render(<Modal>content</Modal>);
    expect(screen.getByTestId('modal')).toBeInTheDocument();
  });

  it('displays children', () => {
    render(<Modal>my content</Modal>);
    expect(screen.getByText('my content')).toBeInTheDocument();
  });

  it('accepts "open" prop', () => {
    render(<Modal open>my content</Modal>);
    expect(screen.getByTestId('modal')).toHaveClass('containerOpen');
  });

  it('accepts "onClose" prop', async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();
    render(
      <Modal open onClose={onClose}>
        my content
      </Modal>
    );
    await user.click(screen.getByTestId('modal'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
