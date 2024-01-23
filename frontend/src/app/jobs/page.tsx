'use client';

import { Loading } from '@/components/Loading/Loading';
import { JobsContainer } from '@/components/containers/JobsContainer/JobsContainer';

import { useGetJobs } from '@/graphQL/useGetJobs';

export default function JobsPage() {
  const { jobs, jobsError, jobsIsLoading } = useGetJobs({
    pageNumber: 0,
  });

  return (
    <>
      {jobsIsLoading && <Loading size={80} />}
      {jobs && <JobsContainer jobs={jobs} />}
    </>
  );
}
