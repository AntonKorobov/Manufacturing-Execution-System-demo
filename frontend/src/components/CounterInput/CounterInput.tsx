import * as S from './CounterInput.styled';

export function CounterInput({
  onChange,
  value,
}: {
  onChange: (value: number) => void;
  value: number;
}) {
  const handleClickMinus = () => {
    if (value !== 0) {
      const newValue = value - 1;
      onChange(newValue);
    }
  };

  const handleClickPlus = () => {
    const newValue = value + 1;
    onChange(newValue);
  };

  return (
    <S.Wrapper>
      <S.Button onClick={handleClickMinus}>-</S.Button>
      <S.Value>{value}</S.Value>
      <S.Button onClick={handleClickPlus}>+</S.Button>
    </S.Wrapper>
  );
}
