import styled from 'styled-components';

import { ReactNode } from 'react';

import { ActionButtonTypes } from '@/components/types';

interface ActionButtonProps {
  children: ReactNode;
  type: ActionButtonTypes;
  onClick: VoidFunction;
}

export const ActionButton = styled.button<ActionButtonProps>`
  height: 44px;
  width: 100%;
  font-size: ${(props) => props.theme.fontSize.xl};
  background-color: ${(props) => {
    switch (props.type) {
      case ActionButtonTypes.START: {
        return props.theme.color.greenStart;
      }
      case ActionButtonTypes.STOP: {
        return props.theme.color.orangeStop;
      }
      case ActionButtonTypes.NEXT: {
        return props.theme.color.greenLight;
      }
      case ActionButtonTypes.PREV: {
        return props.theme.color.greenLight;
      }
      default: {
        return props.theme.color.mainBlue;
      }
    }
  }};
  color: ${(props) => {
    switch (props.type) {
      case ActionButtonTypes.NEXT: {
        return props.theme.color.greenStart;
      }
      case ActionButtonTypes.PREV: {
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
