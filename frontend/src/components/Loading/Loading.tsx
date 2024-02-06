import * as S from './Loading.styled';

interface LoadingProps {
  size: number;
  height?: number;
}

export const Loading = ({ size, height }: LoadingProps) => {
  return (
    <S.Wrapper style={{ height: height + 'px' || 'auto' }}>
      <S.Loading size={size} />
    </S.Wrapper>
  );
};
