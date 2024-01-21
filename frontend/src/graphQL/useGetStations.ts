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

export function useGetStations() {
  const { data, error, isLoading } = useSWR<getStationsResponse>(
    `/api/stations`,
    fetcher
  );

  return { stations: data, stationsError: error, stationsIsLoading: isLoading };
}
