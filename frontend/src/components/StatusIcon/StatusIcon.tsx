import styled from 'styled-components';

import { ReactNode } from 'react';

import { StationTypes } from '@/graphQL/types';

interface StatusIconProps {
  children: ReactNode;
  type: StationTypes;
}

export const StatusIcon = styled.div<StatusIconProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  width: 100%;
  border-radius: 22px;
  font-family: ${(props) => props.theme.fontFamily.primary};
  font-size: ${(props) => props.theme.fontSize.lg};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  color: ${(props) => props.theme.color.mainWhite};
  background-color: ${(props) => {
    switch (props.type) {
      case StationTypes.UNKNOWN: {
        return props.theme.color.grayDark;
      }
      case StationTypes.WORKING: {
        return props.theme.color.brightBlue;
      }
      case StationTypes.PREPARING: {
        return props.theme.color.greenLight;
      }
      case StationTypes.READY_TO_OPERATE: {
        return props.theme.color.greenLight;
      }
      case StationTypes.PENDING: {
        return props.theme.color.grayDark;
      }
      case StationTypes.REPAIRING: {
        return props.theme.color.greenLight;
      }
      default: {
        return props.theme.color.mainBlue;
      }
    }
  }};
`;
