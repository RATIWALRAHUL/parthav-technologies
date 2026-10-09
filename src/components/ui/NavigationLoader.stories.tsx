import type { Meta, StoryObj } from "@storybook/nextjs";
import { NavigationLoader } from "./NavigationLoader";

const meta: Meta<typeof NavigationLoader> = {
  title: "UI/NavigationLoader",
  component: NavigationLoader,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof NavigationLoader>;

export const Default: Story = {
  render: () => (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h2>Navigation Page Transition Loader</h2>
      <p>
        Sits right on top of the navbar and shows progress whenever the user navigates between pages.
      </p>
      <NavigationLoader />
    </div>
  ),
};
