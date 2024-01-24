import { ReactNode } from 'react';

import * as S from './ActionButton.styled';

type TActionButton = 'start' | 'stop' | 'next' | 'prev';

interface ActionButtonProps {
  children: ReactNode;
  type: TActionButton;
  onClick: VoidFunction;
}

export function ActionButton({ children, type, onClick }: ActionButtonProps) {
  return (
    <S.Button className={type} onClick={onClick}>
      {children}
    </S.Button>
  );
}
