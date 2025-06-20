import React from 'react';
import type { Meta, StoryFn } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';

import '../styles.css';

import { Modal } from '../components/Modal';
import { Button } from '../components/Button';

const meta = {
  title: 'Example/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: { onClose: fn() },
} satisfies Meta<typeof Modal>;

export default meta;

const Template: StoryFn<typeof Modal> = (args) => {
  const [open, setOpen] = React.useState(args.open || false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        {args.children}
      </Modal>
    </>
  );
};

export const Default = Template.bind({});

Default.args = {
  children: <div>Hello world!</div>,
};
