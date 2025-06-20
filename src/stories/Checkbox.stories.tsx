import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';

import '../styles.css';
import { Checkbox } from '../components/Checkbox';

const meta = {
  title: 'Example/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: { onChange: fn() },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Checked: Story = {
  args: { checked: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const CheckedDisabled: Story = {
  args: { disabled: true, checked: true },
};
