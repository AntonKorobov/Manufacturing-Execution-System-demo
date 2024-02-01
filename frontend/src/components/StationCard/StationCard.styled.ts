import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';

import { StatusIcon as StatusIconComponents } from '@/components/StatusIcon/StatusIcon';

export const Wrapper = styled(Link)`
  width: 24%;
  height: 49%;
  padding: 10px;
  border: 1px solid ${(props) => props.theme.color.grayLight};
  font-size: ${(props) => props.theme.fontSize.md};
  &:hover {
    box-shadow: 0px 0px 16px -1px ${(props) => props.theme.color.mainBlue};
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

export const Item = styled.li``;

export const ImageContainer = styled.div`
  height: 55%;
  overflow: hidden;
`;

export const ImageNext = styled(Image)`
  display: block;
  margin: 0 auto;
  object-fit: cover;
  overflow: hidden;
`;

export const StatusIcon = styled(StatusIconComponents)`
  height: 20px;
  width: fit-content;
  font-size: ${(props) => props.theme.fontSize.md};
`;

export const StatusWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
