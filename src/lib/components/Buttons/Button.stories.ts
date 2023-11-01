import type { Meta, StoryObj } from '@storybook/svelte';

import Button from './Button.svelte';

const meta = {
  title: 'Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
    },
  },
} satisfies Meta<Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultButton: Story = {};

export const Secondary: Story = {
  args: {
    title: 'Button',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    title: 'Large Btn',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    title: 'Small Btn',
  },
};
