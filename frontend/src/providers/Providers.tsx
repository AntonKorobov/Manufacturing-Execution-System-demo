'use client';

import { ThemeProvider } from 'styled-components';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

import { StyledComponentsRegistry } from '@/providers/registry/StyledComponentsRegistry';

import { theme } from '@/styles/theme.styled';

export const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <StyledComponentsRegistry>
      <AppRouterCacheProvider options={{ enableCssLayer: true }}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </AppRouterCacheProvider>
    </StyledComponentsRegistry>
  );
};
