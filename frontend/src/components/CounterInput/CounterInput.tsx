import { useState } from 'react';

import * as S from './CounterInput.styled';

export function CounterInput() {
  const [value, setValue] = useState(0);

  const handleClickMinus = () => {
    if (value !== 0) {
      setValue((prev) => prev - 1);
    }
  };

  const handleClickPlus = () => {
    setValue((prev) => prev + 1);
  };

  return (
    <S.Wrapper>
      <S.Button onClick={handleClickMinus}>-</S.Button>
      <S.Value>{value}</S.Value>
      <S.Button onClick={handleClickPlus}>+</S.Button>
    </S.Wrapper>
  );
}
