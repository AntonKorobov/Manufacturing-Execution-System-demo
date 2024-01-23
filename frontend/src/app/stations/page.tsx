'use client';

import { Loading } from '@/components/Loading/Loading';
import { StationsContainer } from '@/components/containers/StationsContainer/StationsContainer';

import { useGetStations } from '@/graphQL/useGetStations';

export default function StationsPage() {
  const { stations, stationsError, stationsIsLoading } = useGetStations({
    pageNumber: 0,
  });

  return (
    <>
      {stationsIsLoading && <Loading size={80} />}
      {stations && <StationsContainer stations={stations} />}
    </>
  );
}
