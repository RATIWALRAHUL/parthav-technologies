import type { Preview } from '@storybook/nextjs';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Import global CSS, CSS variables, and design tokens
import '../src/styles/variables.css';
import '../src/app/globals.css';

export const decorators = [
  (Story: any) => {
    // Fresh QueryClient instance per story with retry disabled
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          refetchOnWindowFocus: false,
        },
        mutations: {
          retry: false,
        },
      },
    });

    return (
      <QueryClientProvider client={queryClient}>
        <div style={{ padding: '24px', minHeight: '100%', fontFamily: 'var(--font-body)' }}>
          <Story />
        </div>
      </QueryClientProvider>
    );
  },
];

const preview: Preview = {
  decorators,
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // Storybook a11y addon configuration
      test: 'todo',
    },
  },
};

export default preview;