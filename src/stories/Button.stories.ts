import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { fn } from 'storybook/test';

import '../styles.css';
import { Button } from '../components/Button';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default',
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: 'Outlined',
  },
};

export const Contained: Story = {
  args: {
    variant: 'contained',
    children: 'Contained',
  },
};

export const Text: Story = {
  args: {
    variant: 'text',
    children: 'Text',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    children: 'Small',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    children: 'Medium',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    children: 'Large',
  },
};
