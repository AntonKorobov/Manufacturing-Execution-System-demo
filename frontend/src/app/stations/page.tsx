'use client';

import { useQuery } from '@apollo/client';

import { useState } from 'react';

import { Loading } from '@/components/Loading/Loading';
import { StationsContainer } from '@/containers/StationsContainer/StationsContainer';
import { Pagination } from '@/components/Pagination/Pagination';

import { GET_STATIONS_QUERY } from '@/graphQL/queries';

import { getStationsResponse } from '@/graphQL/types';

import * as S from './page.styled';

const STATIONS_ON_PAGE = 8;

export default function StationsPage() {
  const [page, setPage] = useState(1);

  const handlePaginate = (event: React.ChangeEvent<unknown>, value: number) =>
    setPage(value);

  const { data, loading } = useQuery<getStationsResponse>(GET_STATIONS_QUERY, {
    variables: {
      limit: STATIONS_ON_PAGE,
      offset: (page - 1) * STATIONS_ON_PAGE,
    },
    pollInterval: 1000,
  });

  return (
    <>
      {loading && <Loading size={80} />}
      {data && <StationsContainer stations={data.stations} />}
      <S.PaginationWrapper>
        <Pagination count={2} page={page} onChange={handlePaginate} />
      </S.PaginationWrapper>
    </>
  );
}
