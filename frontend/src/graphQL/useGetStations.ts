import useSWR from 'swr';

import { getStationsResponse } from './types';

const fetcher = (url: string) =>
  fetch(url, {}).then((res) => {
    if (!res.ok) {
      const error = new Error('An error occurred while fetching the data.');
      throw error;
    }
    return res.json();
  });

export function useGetStations({
  pageNumber,
  shouldFetch = true,
}: {
  pageNumber: number;
  shouldFetch?: boolean;
}) {
  const { data, error, isLoading } = useSWR<getStationsResponse>(
    shouldFetch ? `/api/stations?page=${pageNumber}` : null,
    fetcher,
    { refreshInterval: 1000 }
  );

  return { stations: data, stationsError: error, stationsIsLoading: isLoading };
}
