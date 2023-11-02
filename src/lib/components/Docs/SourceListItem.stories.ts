import type { Meta, StoryObj } from "@storybook/svelte";
import SourceListItem from "./SourceListItem.svelte";

const meta = {
  title: 'SourceListItem',
  component: SourceListItem,
  tags: ['autodocs'],
} satisfies Meta<SourceListItem>;

export default meta;
type Story = StoryObj<typeof meta>;
