'use client';

import { ThemeProvider } from 'styled-components';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ApolloProvider } from '@apollo/client';

import createApolloClient from '@/graphQL/apolloClient';
import { StyledComponentsRegistry } from '@/providers/registry/StyledComponentsRegistry';

import { theme } from '@/styles/theme.styled';

export const Providers = ({ children }: React.PropsWithChildren) => {
  const client = createApolloClient();

  return (
    <ApolloProvider client={client}>
      <StyledComponentsRegistry>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </AppRouterCacheProvider>
      </StyledComponentsRegistry>
    </ApolloProvider>
  );
};
