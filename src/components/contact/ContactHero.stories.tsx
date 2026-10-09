import type { Meta, StoryObj } from "@storybook/nextjs";
import { ContactHero } from "./ContactHero";

const meta: Meta<typeof ContactHero> = {
  title: "Contact/ContactHero",
  component: ContactHero,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ContactHero>;

export const Default: Story = {
  render: () => <ContactHero />,
};
