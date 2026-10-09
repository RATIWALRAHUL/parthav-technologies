import type { Meta, StoryObj } from '@storybook/nextjs';
import { ChatMessageItem } from './ChatMessageItem';

const meta: Meta<typeof ChatMessageItem> = {
  title: 'Chat/ChatMessageItem',
  component: ChatMessageItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ChatMessageItem>;

export const AssistantMessage: Story = {
  args: {
    message: {
      id: '1',
      sender: 'assistant',
      content: 'Hi there! Welcome to Parthav Technologies. How can we help you scale today?',
      timestamp: '10:30 AM',
      type: 'text',
    },
  },
};

export const UserMessage: Story = {
  args: {
    message: {
      id: '2',
      sender: 'user',
      content: 'We need to build a high-performance SaaS web application with Next.js.',
      timestamp: '10:31 AM',
      type: 'text',
      status: 'sent',
    },
  },
};

export const WithActionLink: Story = {
  args: {
    message: {
      id: '3',
      sender: 'assistant',
      content: 'You can explore our full Web Development capabilities right here:',
      timestamp: '10:32 AM',
      type: 'text',
      meta: {
        route: '/services/web-development',
      },
    },
  },
};
