import useSWR from 'swr';

import { getJobsResponse } from './types';

const fetcher = (url: string) =>
  fetch(url, {}).then((res) => {
    if (!res.ok) {
      const error = new Error('An error occurred while fetching the data.');
      throw error;
    }
    return res.json();
  });

export function useGetJobs({ pageNumber }: { pageNumber: number }) {
  const { data, error, isLoading } = useSWR<getJobsResponse>(
    `/api/jobs?page=${pageNumber}`,
    fetcher,
    { refreshInterval: 1000 }
  );

  return { jobs: data, jobsError: error, jobsIsLoading: isLoading };
}
