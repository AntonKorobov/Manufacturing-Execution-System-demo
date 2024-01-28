import { StationStatuses } from '@/graphQL/types';

import * as S from './StationCard.styled';

interface StationCardProps {
  stationImgUrl: string;
  stationName: string;
  stationType: string;
  stationCode: string;
  stationStatus: StationStatuses;
  isValidating: boolean;
}

export function StationCard({
  stationImgUrl,
  stationName,
  stationType,
  stationCode,
  stationStatus,
  isValidating,
}: StationCardProps) {
  return (
    <S.Wrapper href={'/jobs'}>
      <S.ImageContainer>
        <S.ImageNext
          src={stationImgUrl}
          width={180}
          height={180}
          alt="station"
        ></S.ImageNext>
      </S.ImageContainer>
      <S.List>
        <li>
          Name: <span>{stationName}</span>
        </li>
        <li>
          Type: <span>{stationType}</span>
        </li>
        <li>
          Code: <span>{stationCode}</span>
        </li>
        <li>
          Status:
          <S.Status type={stationStatus}>{stationStatus}</S.Status>
        </li>
      </S.List>
    </S.Wrapper>
  );
}
