import type { Meta, StoryObj } from "@storybook/svelte";
import SourceList from "./SourceList.svelte";
import { within } from "@storybook/testing-library";

const meta = {
  title: 'SourceList',
  component: SourceList,
  tags: ['autodocs'],
} satisfies Meta<SourceList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PopulatedSourceList: Story = {
  args: {
    sources: [{
      id: 1,
      type: 'web',
      name: 'My Doc Source',
      location: 'http://example.com',
      created: '2023-31-01T09:00:00Z',
      formats: []
    }]
  }
}

export const EmptySourceList: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await canvas.findByText(`You don't have any sources yet.`);
  }
}