import type { Meta, StoryObj } from '@storybook/nextjs';
import { Code2, Bot, PenTool } from 'lucide-react';
import { MainServiceCard } from './MainServiceCard';

const meta: Meta<typeof MainServiceCard> = {
  title: 'Services/MainServiceCard',
  component: MainServiceCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MainServiceCard>;

export const Default: Story = {
  args: {
    number: '01',
    icon: <Code2 size={24} />,
    title: 'Web & Mobile Development',
    description: 'Scalable Next.js web apps, performant cloud architecture, and responsive digital products.',
    serviceCount: 6,
    isSelected: false,
    onSelect: () => {},
  },
};

export const Selected: Story = {
  args: {
    number: '02',
    icon: <PenTool size={24} />,
    title: 'UI/UX & Product Design',
    description: 'Human-centric user journeys, design systems, and conversion-optimized digital interfaces.',
    serviceCount: 5,
    isSelected: true,
    onSelect: () => {},
  },
};

export const AIAutomation: Story = {
  args: {
    number: '03',
    icon: <Bot size={24} />,
    title: 'AI Solutions & Automation',
    description: 'Custom AI agent workflows, automated pipelines, and intelligent business systems.',
    serviceCount: 4,
    isSelected: false,
    onSelect: () => {},
  },
};
