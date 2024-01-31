import { StationStatuses } from '@/graphQL/types';

import * as S from './StationCard.styled';

interface StationCardProps {
  stationImgUrl: string;
  stationName: string;
  stationType: string;
  stationCode: string;
  stationStatus: StationStatuses;
  url: string;
}

export function StationCard({
  stationImgUrl,
  stationName,
  stationType,
  stationCode,
  stationStatus,
  url,
}: StationCardProps) {
  return (
    <S.Wrapper href={url}>
      <S.ImageContainer>
        <S.ImageNext
          src={stationImgUrl}
          width={180}
          height={180}
          alt="station"
        ></S.ImageNext>
      </S.ImageContainer>
      <S.List>
        <S.Item>
          Name: <span>{stationName}</span>
        </S.Item>
        <S.Item>
          Type: <span>{stationType}</span>
        </S.Item>
        <S.Item>
          Code: <span>{stationCode}</span>
        </S.Item>
        <S.Item>
          <S.StatusWrapper>
            Status:
            <S.StatusIcon type={stationStatus}>{stationStatus}</S.StatusIcon>
          </S.StatusWrapper>
        </S.Item>
      </S.List>
    </S.Wrapper>
  );
}
