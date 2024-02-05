'use client';

import { useState } from 'react';

import { useQuery } from '@apollo/client';

import { Loading } from '@/components/Loading/Loading';
import { JobsTable } from '@/containers/JobsTable/JobsTable';
import { Pagination } from '@/components/Pagination/Pagination';

import { GET_JOBS_QUERY } from '@/graphQL/queries';

import { getJobsResponse } from '@/graphQL/types';

import * as S from './page.styled';

const JOBS_ON_PAGE = 10;

export default function JobsPage() {
  const [page, setPage] = useState(1);

  const handlePaginate = (event: React.ChangeEvent<unknown>, value: number) =>
    setPage(value);

  const { data, loading } = useQuery<getJobsResponse>(GET_JOBS_QUERY, {
    variables: {
      limit: JOBS_ON_PAGE,
      offset: (page - 1) * JOBS_ON_PAGE,
    },
    pollInterval: 1000,
  });

  return (
    <>
      {loading && <Loading size={80} />}
      {data && <JobsTable jobs={data.jobs} />}
      <S.PaginationWrapper>
        <Pagination count={1} page={page} onChange={handlePaginate} />
      </S.PaginationWrapper>
    </>
  );
}
