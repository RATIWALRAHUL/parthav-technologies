import type { Meta, StoryObj } from '@storybook/nextjs';
import { TechLogo } from './TechLogo';

const meta: Meta<typeof TechLogo> = {
  title: 'Common/TechLogo',
  component: TechLogo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TechLogo>;

export const NextJS: Story = {
  args: {
    name: 'Next.js',
    size: 40,
  },
};

export const ReactLogo: Story = {
  args: {
    name: 'React',
    size: 40,
  },
};

export const TypeScript: Story = {
  args: {
    name: 'TypeScript',
    size: 40,
  },
};

export const Tailwind: Story = {
  args: {
    name: 'Tailwind CSS',
    size: 40,
  },
};

export const Python: Story = {
  args: {
    name: 'Python',
    size: 40,
  },
};
