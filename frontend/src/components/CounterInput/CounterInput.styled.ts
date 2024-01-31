import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 44px;
`;

export const Button = styled.button`
  height: 100%;
  width: 30%;
  font-size: ${(props) => props.theme.fontSize.xxl};
  background-color: ${(props) => props.theme.color.brightBlue};
  color: ${(props) => props.theme.color.mainWhite};
  &:hover {
    border: 1px solid ${(props) => props.theme.color.mainBlue};
    cursor: pointer;
  }
  &:active {
    color: ${(props) => props.theme.color.mainBlue};
  }
`;

export const Value = styled.div`
  width: 40%;
  height: 100%;
  font-size: ${(props) => props.theme.fontSize.xxl};
  background-color: ${(props) => props.theme.color.grayDark};
  color: ${(props) => props.theme.color.mainWhite};
`;
