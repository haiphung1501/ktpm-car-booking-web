import React from 'react';
import { createEmotionCache, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './styles/global.css';

import { AuthenticationLayout } from './components/AuthenticationLayout';

const myCache = createEmotionCache({
  key: 'mantine',
  prepend: false,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <MantineProvider emotionCache={myCache}>
        <QueryClientProvider client={queryClient}>
          <AuthenticationLayout />
          <Notifications />
        </QueryClientProvider>
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>
);
