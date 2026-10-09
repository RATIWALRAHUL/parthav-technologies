import type { Meta, StoryObj } from '@storybook/nextjs';
import { Contact } from './Contact';

const meta: Meta<typeof Contact> = {
  title: 'Home/Contact',
  component: Contact,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Contact>;

export const Default: Story = {};
