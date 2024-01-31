'use client';

import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

import { StyledComponentsRegistry } from '@/providers/registry/StyledComponentsRegistry';

import { store } from '@/store/store';

import { theme } from '@/styles/theme.styled';

export const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <Provider store={store}>
      <StyledComponentsRegistry>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </AppRouterCacheProvider>
      </StyledComponentsRegistry>
    </Provider>
  );
};
