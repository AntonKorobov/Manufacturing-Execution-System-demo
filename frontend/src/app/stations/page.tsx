'use client';

import { useState } from 'react';

import { Loading } from '@/components/Loading/Loading';
import { StationsContainer } from '@/containers/StationsContainer/StationsContainer';
import { Pagination } from '@/components/Pagination/Pagination';

import { useGetStations } from '@/graphQL/useGetStations';

import * as S from './page.styled';

export default function StationsPage() {
  const [page, setPage] = useState(1);

  const handlePaginate = (event: React.ChangeEvent<unknown>, value: number) =>
    setPage(value);

  const { stations, stationsError, stationsIsLoading, stationsIsisValidating } =
    useGetStations({
      pageNumber: page - 1,
    });

  return (
    <>
      {stationsIsLoading && <Loading size={80} />}
      {stations && (
        <StationsContainer stations={stations} isValidating={stationsIsisValidating} />
      )}
      <S.PaginationWrapper>
        <Pagination count={2} page={page} onChange={handlePaginate} />
      </S.PaginationWrapper>
    </>
  );
}
