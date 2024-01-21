'use client';

import { Navigation } from '@/components/Navigation/Navigation';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';

import * as S from './MainLayout.styled';

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <S.LayoutWrapper>
      <Navigation />
      <Header />
      <S.Main>{children}</S.Main>
      <Footer />
    </S.LayoutWrapper>
  );
}
