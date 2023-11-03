import type { Meta, StoryObj } from "@storybook/svelte";
import Chollocon from "./Chollocon.svelte";

const meta = {
  title: 'Chollocon',
  component: Chollocon,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: { type: 'select'},
      options: ['www', 'web', 'device', 'drive', 'x', 'close', 'copy']
    },

  }
} satisfies Meta<Chollocon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WebIcon: Story = {
  args: {
    name: 'web',
    size: '24',
    strokeColor: '#777',
    strokeWidth: 2
  }
}

export const CopyIcon: Story = {
  args: {
    name: 'copy',
    size: '24',
    strokeColor: '#770000', // @TODO: fix colour
    strokeWidth: 2
  }
}