import type { Meta, StoryObj } from "@storybook/nextjs";
import { ScrollToTop } from "./ScrollToTop";

const meta: Meta<typeof ScrollToTop> = {
  title: "UI/ScrollToTop",
  component: ScrollToTop,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ScrollToTop>;

export const Default: Story = {
  render: () => (
    <div style={{ height: "250vh", padding: "40px", fontFamily: "sans-serif" }}>
      <h2>Scroll down to see the circular progress Jump To Top button</h2>
      <p>The circular border fills according to how far down the page you have scrolled.</p>
      <ScrollToTop />
    </div>
  ),
};
