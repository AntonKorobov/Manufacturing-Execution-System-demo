import styled from 'styled-components';
import Image from 'next/image';

const Button = styled.button`
  width: 40px;
  height: 40px;
  border: 2px solid ${(props) => props.theme.color.grayLight};
  border-radius: 4px;

  &:hover {
    border-color: ${(props) => props.theme.color.mainBlue};
    cursor: pointer;
  }
`;

interface ExpandButtonProps {
  expand: boolean;
  onClick: VoidFunction;
}

export function ExpandButton({
  expand = false,
  onClick: handleClick,
}: ExpandButtonProps) {
  return (
    <Button onClick={handleClick}>
      <Image
        width={20}
        height={20}
        src={'/assets/collapse_arrow.svg'}
        alt="arrow"
        style={{ transform: expand ? 'rotate(180deg)' : '' }}
      />
    </Button>
  );
}
