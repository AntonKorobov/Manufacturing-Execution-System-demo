import { StationCard } from '@/components/StationCard/StationCard';

import { getStationsResponse } from '@/graphQL/types';

import * as S from './StationsContainer.styled';

export function StationsContainer({
  stations,
  isValidating,
}: {
  stations: getStationsResponse;
  isValidating: boolean;
}) {
  return (
    <S.Container>
      {stations.map((station) => {
        return (
          <StationCard
            isValidating={isValidating}
            key={station.id}
            stationImgUrl={station.station_img}
            stationName={station.station_name}
            stationCode={station.station_code}
            stationStatus={station.station_status.station_status_name}
            stationType={station.station_type}
          />
        );
      })}
    </S.Container>
  );
}
