import { StationCard } from '@/components/StationCard/StationCard';

import { Station } from '@/graphQL/types';

import * as S from './StationsContainer.styled';

interface StationsContainerProps {
  stations: Station[];
}

export function StationsContainer({ stations }: StationsContainerProps) {
  return (
    <S.Container>
      {stations.map((station) => {
        return (
          <StationCard
            key={station.id}
            stationImgUrl={station.station_img}
            stationName={station.station_name}
            stationCode={station.station_code}
            stationStatusId={station.station_status.id}
            stationType={station.station_type}
            url={`/stations/${station.id}/jobs`}
          />
        );
      })}
    </S.Container>
  );
}
