import * as S from './CounterInput.styled';

interface CounterInputProps {
  onChange: (value: number) => void;
  value: number;
}

export function CounterInput({ onChange, value }: CounterInputProps) {
  const handleClickMinus = () => {
    onChange(value - 1);
  };

  const handleClickPlus = () => {
    onChange(value + 1);
  };

  return (
    <S.Wrapper>
      <S.Button onClick={handleClickMinus}>-</S.Button>
      <S.Value>{value}</S.Value>
      <S.Button onClick={handleClickPlus}>+</S.Button>
    </S.Wrapper>
  );
}
