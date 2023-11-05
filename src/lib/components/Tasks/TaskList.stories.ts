import type { Meta, StoryObj } from "@storybook/svelte";
import TaskList from "./TaskList.svelte";
import { within } from "@storybook/testing-library";

const meta = {
  title: 'TaskList',
  component: TaskList
} satisfies Meta<TaskList>

export default meta;
type Story = StoryObj<typeof meta>;

export const TaskListEmpty: Story = {
  play: (async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    canvas.findAllByText(`You don't have any tasks. Why not create one?`)
  })
};

export const TaskListWithItems: Story = {
  args: {
    tasks: [{
      id: 1,
      scheduled: '2023-11-05T07:00:00.000Z',
      source: { id: 1, name: 'Source 1', location: 'https://test.site', type: 'web'},
      format: { id: 1, name: 'Format 1', location: '/list-page', type: 'html'},
      steps: []
    }]
  },
  play: (async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    canvas.findAllByText(`You don't have any tasks. Why not create one?`)
  })
};
