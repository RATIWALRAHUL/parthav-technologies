import type { Meta, StoryObj } from '@storybook/nextjs';
import { ComingSoonModal } from './ComingSoonModal';

const meta: Meta<typeof ComingSoonModal> = {
  title: 'Services/ComingSoonModal',
  component: ComingSoonModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ComingSoonModal>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    serviceName: 'Enterprise SaaS Architecture',
    category: 'Development',
    description: 'We are preparing this high-availability cloud service. Subscribe to be notified upon launch.',
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    serviceName: 'Enterprise SaaS Architecture',
    category: 'Development',
  },
};
