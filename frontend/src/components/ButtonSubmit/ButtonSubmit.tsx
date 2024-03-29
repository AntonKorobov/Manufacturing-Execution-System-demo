import { styled } from 'styled-components';
import Button from '@mui/material/Button';

import { ReactNode } from 'react';

const SButtonSubmit = styled(Button)`
  height: 40px;
  font-family: ${(props) => props.theme.fontFamily.primary};
  font-size: ${(props) => props.theme.fontSize.md};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  text-transform: none;
  background-color: ${(props) => props.theme.color.mainBlue};
`;

interface ButtonSubmitProps {
  children: ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
  onClick: () => void;
}

export const ButtonSubmit = ({
  children,
  disabled = false,
  onClick: handleClick,
  fullWidth = false,
}: ButtonSubmitProps) => {
  return (
    <SButtonSubmit
      variant="contained"
      size="medium"
      disabled={disabled}
      onClick={handleClick}
      fullWidth={fullWidth}
    >
      {children}
    </SButtonSubmit>
  );
};
