import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';

import '../styles.css';

import { TextField } from '../components/TextField';

const meta = {
  title: 'Example/TextField',
  component: TextField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: { onClick: fn() },
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof TextField>;

export const Default: Story = {
  args: {
    label: 'Default',
  },
};

export const WithValue: Story = {
  args: {
    label: 'With Value',
    value: 'Custom Value',
  },
};

export const WithLongLabel: Story = {
  args: {
    label: 'Loooooooooooooooooooooooooooooooooooooooooooong',
  },
};

export const WithError: Story = {
  args: {
    label: 'Name',
    value: 'Balerina Cappucino',
    error: 'You cannot be serious',
  },
};
