import * as S from './Loading.styled';

export const Loading = ({ size, height }: { size: number; height?: number }) => {
  return (
    <S.Wrapper style={{ height: height + 'px' || 'auto' }}>
      <S.Loading size={size} />
    </S.Wrapper>
  );
};
