'use client';

import { Suspense } from 'react';

import { Navigation } from '@/components/Navigation/Navigation';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import { Loading } from '@/components/Loading/Loading';

import * as S from './MainLayout.styled';

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <S.LayoutWrapper>
      <Navigation />
      <Header />
      <Suspense fallback={<Loading size={80} />}>
        <S.Main>{children}</S.Main>
      </Suspense>
      <Footer />
    </S.LayoutWrapper>
  );
}
