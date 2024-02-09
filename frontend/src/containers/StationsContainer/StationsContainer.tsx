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
            stationImgUrl={station.img}
            stationName={station.name}
            stationCode={station.code}
            stationStatusId={station.status}
            stationType={station.type}
            url={`/stations/${station.id}/jobs`}
          />
        );
      })}
    </S.Container>
  );
}
