import styled from 'styled-components';

export const Button = styled.button`
  height: 44px;
  width: 100%;
  font-size: ${(props) => props.theme.fontSize.lg};
  background-color: ${(props) => {
    switch (props.className) {
      case 'start': {
        return props.theme.color.greenStart;
      }
      case 'stop': {
        return props.theme.color.orangeStop;
      }
      case 'next': {
        return props.theme.color.greenLight;
      }
      case 'prev': {
        return props.theme.color.greenLight;
      }
      default: {
        return props.theme.color.mainBlue;
      }
    }
  }};
  color: ${(props) => {
    switch (props.className) {
      case 'next': {
        return props.theme.color.greenStart;
      }
      case 'prev': {
        return props.theme.color.greenStart;
      }
      default: {
        return props.theme.color.mainWhite;
      }
    }
  }};
  &:hover {
    border: 1px solid ${(props) => props.theme.color.mainBlue};
    cursor: pointer;
  }
  &:active {
    color: ${(props) => props.theme.color.mainBlue};
  }
`;
