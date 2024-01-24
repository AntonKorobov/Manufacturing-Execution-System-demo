import styled from 'styled-components';
import Image from 'next/image';

import { collapse_arrow } from '@/assets';

const Button = styled.button`
  width: 40px;
  height: 40px;
  border: 2px solid ${(props) => props.theme.color.grayLight};
  border-radius: 4px;

  &:hover {
    border-color: ${(props) => props.theme.color.mainBlue};
    cursor: pointer;
  }

  &:active {
    svg {
      background-color: red;
      color: ${(props) => props.theme.color.mainBlue};
    }
  }
`;

export function ExpandButton({
  expand = false,
  onClick,
}: {
  expand: boolean;
  onClick: VoidFunction;
}) {
  return (
    <Button onClick={onClick}>
      <Image
        width={20}
        height={20}
        src={collapse_arrow}
        alt="arrow"
        style={{ transform: expand ? 'rotate(180deg)' : '' }}
      />
    </Button>
  );
}