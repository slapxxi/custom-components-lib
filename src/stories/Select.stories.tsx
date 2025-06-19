import React, { useState } from 'react';
import type { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import '../styles.css';
import { Select, SelectItem } from '../components/Select';

const meta = {
  title: 'Example/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Default',
    children: (
      <>
        <SelectItem value="one">One</SelectItem>
        <SelectItem value="two">Two</SelectItem>
        <SelectItem value="three">Three</SelectItem>
        <SelectItem value="sixty-nine">Sixty Nine</SelectItem>
      </>
    ),
  },
};

export const WithValue: Story = {
  args: {
    label: 'With Value',
    value: 'Value',
    children: (
      <>
        <SelectItem value="one">One</SelectItem>
        <SelectItem value="two">Two</SelectItem>
        <SelectItem value="three">Three</SelectItem>
        <SelectItem value="sixty-nine">Sixty Nine</SelectItem>
      </>
    ),
  },
};

const Template: StoryFn<typeof Select> = (args) => {
  const [value, setValue] = useState(args.value || '');

  return (
    <Select
      {...args}
      value={value}
      onChange={(value) => {
        setValue(value);
        args.onChange?.(value);
      }}
    />
  );
};

export const Controlled = Template.bind({});

Controlled.args = {
  label: 'Controlled',
  children: (
    <>
      <SelectItem value="sixty-nine">Sixty Nine</SelectItem>
      <SelectItem value="420">Four Twenty</SelectItem>
    </>
  ),
};
