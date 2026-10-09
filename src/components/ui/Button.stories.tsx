import type { Meta, StoryObj } from '@storybook/nextjs';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'text'],
      description: 'Visual style variant of the button',
    },
    loading: {
      control: 'boolean',
      description: 'Displays a loading spinner and disables clicks',
    },
    disabled: {
      control: 'boolean',
      description: 'HTML disabled state',
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    variant: 'primary',
    children: 'Start Project',
  },
};

export const WithIcon: Story = {
  args: {
    variant: 'primary',
    children: 'Explore Capabilities',
    icon: <ArrowRight size={16} />,
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'View Case Studies',
    icon: <Sparkles size={16} />,
  },
};

export const TextVariant: Story = {
  args: {
    variant: 'text',
    children: 'Learn More',
    icon: <ArrowRight size={14} />,
  },
};

export const Loading: Story = {
  args: {
    variant: 'primary',
    children: 'Submitting Brief...',
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    children: 'Action Unavailable',
    disabled: true,
  },
};
