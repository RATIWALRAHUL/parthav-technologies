import type { Meta, StoryObj } from "@storybook/nextjs";
import { Process } from "./Process";

const meta: Meta<typeof Process> = {
  title: "Home/Process",
  component: Process,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Process>;

export const Default: Story = {
  render: () => <Process />,
};
