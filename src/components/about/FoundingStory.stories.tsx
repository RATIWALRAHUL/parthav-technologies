import type { Meta, StoryObj } from "@storybook/nextjs";
import { FoundingStory } from "./FoundingStory";

const meta: Meta<typeof FoundingStory> = {
  title: "About/FoundingStory",
  component: FoundingStory,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FoundingStory>;

export const Default: Story = {
  render: () => <FoundingStory />,
};
