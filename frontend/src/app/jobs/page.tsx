'use client';

import { useState } from 'react';

import { Loading } from '@/components/Loading/Loading';
import { JobsTable } from '@/containers/JobsTable/JobsTable';
import { Pagination } from '@/components/Pagination/Pagination';

import { useGetJobs } from '@/graphQL/useGetJobs';

import * as S from './page.styled';

export default function JobsPage() {
  const [page, setPage] = useState(1);

  const handlePaginate = (event: React.ChangeEvent<unknown>, value: number) =>
    setPage(value);

  const { jobs, jobsIsLoading } = useGetJobs({
    pageNumber: 0,
  });

  return (
    <>
      {jobsIsLoading && <Loading size={80} />}
      {jobs && <JobsTable jobs={jobs} />}
      <S.PaginationWrapper>
        <Pagination count={1} page={page} onChange={handlePaginate} />
      </S.PaginationWrapper>
    </>
  );
}
