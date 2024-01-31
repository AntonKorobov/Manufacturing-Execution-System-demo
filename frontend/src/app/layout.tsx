import cn from 'classnames';

import type { Metadata } from 'next';

import { Providers } from '../providers/Providers';

import { GlobalStyles } from '@/styles/globalStyles.styled';
import { inter, roboto_mono } from '@/styles/fonts/fonts';

import { MainLayout } from '@/layouts/MainLayout';

export const metadata: Metadata = {
  title: 'Manufacturing Execution System',
  description: 'Demo app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={cn(`${inter.variable} font-sans`, `${roboto_mono.variable} font-sans`)}
      >
        <Providers>
          <GlobalStyles />
          <MainLayout>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  );
}
