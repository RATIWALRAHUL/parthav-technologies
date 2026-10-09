import type { Meta, StoryObj } from "@storybook/nextjs";
import { AboutHero } from "./AboutHero";

const meta: Meta<typeof AboutHero> = {
  title: "About/AboutHero",
  component: AboutHero,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AboutHero>;

export const Default: Story = {};
