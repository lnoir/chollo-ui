import type { Meta, StoryObj } from "@storybook/svelte";
import SourceDetail from "./SourceDetail.svelte";

const meta = {
  title: 'SourceDetail',
  component: SourceDetail,
  tags: ['autodocs'],
} satisfies Meta<SourceDetail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WebSource: Story = {
  args: {
    source: {
      id: 1,
      type: 'web',
      name: 'My Web Source',
      location: 'http://example.com',
      created: '2023-31-01T09:00:00Z',
      formats: []
    }
  }
}

export const FileSource: Story = {
  args: {
    source: {
      id: 1,
      type: 'drive',
      name: 'My File Source',
      location: 'file:///example/file.txt',
      created: '2023-11-01T08:00:00Z',
      formats: []
    }
  }
}

export const SourceWithFormats: Story = {
  args: {
    source: {
      id: 1,
      type: 'web',
      name: 'My Doc Source',
      location: 'http://website.test',
      created: '2023-31-01T09:00:00Z',
      formats: [{
        id: 1,
        name: 'Test format',
        location: '/',
        type: 'html',
        created: '2023-31-01T09:01:00Z' 
      }]
    }
  },
}