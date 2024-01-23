import styled from 'styled-components';
import NavLink from 'next/link';

export const NavigationLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100px;
  font-size: ${(props) => props.theme.fontSize.lg};
  color: ${(props) => props.theme.color.grayLight};
  background-color: ${(props) =>
    props.className === 'active' ? 'rgba(255, 255, 255, 0.2)' : 'transparent'};
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;
