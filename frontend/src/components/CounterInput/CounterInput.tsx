import { useState } from 'react';

import * as S from './CounterInput.styled';

export function CounterInput({
  onChange,
  value,
}: {
  onChange: (value: number) => void;
  value: number;
}) {
  const [counter, setCounter] = useState(value);

  const handleClickMinus = () => {
    if (value !== 0) {
      const newValue = value - 1;
      setCounter(newValue);
      onChange(newValue);
    }
  };

  const handleClickPlus = () => {
    const newValue = value + 1;
    setCounter(newValue);
    onChange(newValue);
  };

  return (
    <S.Wrapper>
      <S.Button onClick={handleClickMinus}>-</S.Button>
      <S.Value>{counter}</S.Value>
      <S.Button onClick={handleClickPlus}>+</S.Button>
    </S.Wrapper>
  );
}
