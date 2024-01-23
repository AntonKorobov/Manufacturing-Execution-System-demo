import { StationCard } from '@/components/StationCard/StationCard';

import { getStationsResponse } from '@/graphQL/types';

import * as S from './StationsContainer.styled';

export function StationsContainer({ stations }: { stations: getStationsResponse }) {
  return (
    <S.Container>
      {stations.map((station) => {
        return (
          <StationCard
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
