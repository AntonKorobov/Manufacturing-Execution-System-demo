import { StationCard } from '@/components/StationCard/StationCard';

import { Station } from '@/graphQL/types';

import * as S from './StationsContainer.styled';

export function StationsContainer({ stations }: { stations: Station[] }) {
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
            url={`/stations/${station.id}/jobs`}
          />
        );
      })}
    </S.Container>
  );
}
