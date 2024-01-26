import useSWR from 'swr';

import { getJobOperationsResponse } from './types';

const fetcher = (url: string) =>
  fetch(url, {}).then((res) => {
    if (!res.ok) {
      const error = new Error('An error occurred while fetching the data.');
      throw error;
    }
    return res.json();
  });

export function useGetJobOperations({
  jobId,
  shouldFetch = true,
}: {
  jobId: number;
  shouldFetch?: boolean;
}) {
  const { data, error, isLoading } = useSWR<getJobOperationsResponse>(
    shouldFetch ? `/api/jobs/${jobId}/operations` : null,
    fetcher,
    { refreshInterval: 1000 }
  );

  return { operations: data, operationsError: error, operationsIsLoading: isLoading };
}
