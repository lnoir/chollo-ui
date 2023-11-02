import type { Meta, StoryObj } from '@storybook/svelte';
import Page from './+page.svelte';
import { within } from '@storybook/testing-library';

const meta = {
  title: 'Start Page',
  component: Page,
  parameters: {}
} satisfies Meta<Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InitialState: Story = {
  /*play: async({ canvasElement}) => {
    const canvas = within(canvasElement);
    canvas.getByText('Sources');
  }*/
};
