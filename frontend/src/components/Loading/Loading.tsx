import * as S from './Loading.styled';

export const Loading = ({ size }: { size: number }) => {
  return (
    <S.Wrapper>
      <S.Loading size={size} />
    </S.Wrapper>
  );
};
