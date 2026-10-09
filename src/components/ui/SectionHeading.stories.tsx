import type { Meta, StoryObj } from '@storybook/nextjs';
import { SectionHeading } from './SectionHeading';

const meta: Meta<typeof SectionHeading> = {
  title: 'UI/SectionHeading',
  component: SectionHeading,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SectionHeading>;

export const Default: Story = {
  args: {
    eyebrow: 'CORE CAPABILITIES',
    title: 'Transforming complex challenges into scalable products',
    description: 'We partner with ambitious enterprises and startups to deliver end-to-end digital engineering.',
    align: 'left',
    theme: 'light',
  },
};

export const Centered: Story = {
  args: {
    eyebrow: 'WHY PARTHAV',
    title: 'Built in Jaipur. Designed for the world.',
    description: 'Relentless engineering discipline, strategic product thinking, and direct partner access.',
    align: 'center',
    theme: 'light',
  },
};

export const DarkTheme: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  args: {
    eyebrow: 'GLOBAL DELIVERY',
    title: 'High-performance engineering by default',
    description: 'Sub-second page speeds, Lighthouse 95+ scores, and resilient cloud architectures.',
    align: 'left',
    theme: 'dark',
  },
};
