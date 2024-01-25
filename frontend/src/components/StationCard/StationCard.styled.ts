import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';

import { StatusIcon } from '@/components/StatusIcon/StatusIcon';

export const Wrapper = styled(Link)`
  width: 24%;
  height: 48%;
  padding: 10px;
  border: 1px solid ${(props) => props.theme.color.grayLight};
  font-size: ${(props) => props.theme.fontSize.md};
  &:hover {
    border-color: ${(props) => props.theme.color.mainBlue};
    img {
      transition-duration: 1s;
      transform: scale(1.1);
    }
  }
`;

export const List = styled.ul`
  margin-top: 10px;
  list-style-type: none;
`;

export const ImageContainer = styled.div`
  height: 60%;
  overflow: hidden;
`;

export const ImageNext = styled(Image)`
  display: block;
  margin: 0 auto;
  object-fit: cover;
  overflow: hidden;
`;

export const Status = styled(StatusIcon)`
  height: 20px;
  width: 40%;
  font-size: ${(props) => props.theme.fontSize.md};
`;
