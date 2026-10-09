import type { Meta, StoryObj } from "@storybook/nextjs";
import { OfficeSection } from "./OfficeSection";

const meta: Meta<typeof OfficeSection> = {
  title: "Contact/OfficeSection",
  component: OfficeSection,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof OfficeSection>;

export const Default: Story = {
  render: () => <OfficeSection />,
};
