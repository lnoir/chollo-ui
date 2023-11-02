import type { Meta, StoryObj } from "@storybook/svelte";
import SourceForm from "./SourceForm.svelte";

const meta = {
  title: 'SourceForm',
  component: SourceForm,
  tags: ['autodocs']
} satisfies Meta<SourceForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EmptyForm: Story = {}

export const EditForm: Story = {
  args: {
    source: {
      id: 1,
      type: 'web',
      name: 'My Doc Source',
      location: 'http://example.com',
      created: '2023-31-01T09:00:00Z',
      formats: []
    }
  }
}