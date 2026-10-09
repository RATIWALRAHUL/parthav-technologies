import type { Meta, StoryObj } from '@storybook/nextjs';
import { ServiceDetailCard } from './ServiceDetailCard';
import { ComingSoonProvider } from './ComingSoonProvider';

const meta: Meta<typeof ServiceDetailCard> = {
  title: 'Services/ServiceDetailCard',
  component: ServiceDetailCard,
  decorators: [
    (Story) => (
      <ComingSoonProvider>
        <div style={{ maxWidth: 360 }}>
          <Story />
        </div>
      </ComingSoonProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ServiceDetailCard>;

export const ActiveService: Story = {
  args: {
    title: 'Custom Web Applications',
    description: 'Bespoke web applications built with Next.js, React, and TypeScript designed for scale.',
    category: 'Web Development',
    href: '/services/web-development',
    status: 'available',
  },
};

export const ComingSoon: Story = {
  args: {
    title: 'Mobile App Architecture',
    description: 'Cross-platform iOS and Android mobile development using Flutter and React Native.',
    category: 'Web Development',
    status: 'coming-soon',
    comingSoon: true,
  },
};
