import styled from 'styled-components';

import { ReactNode } from 'react';

import { TStationStatuses } from '@/graphQL/types';

interface StatusIconProps {
  children: ReactNode;
  type: TStationStatuses;
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
      case 'unknown': {
        return props.theme.color.grayDark;
      }
      case 'working': {
        return props.theme.color.brightBlue;
      }
      case 'preparing': {
        return props.theme.color.greenLight;
      }
      case 'ready to operate': {
        return props.theme.color.greenLight;
      }
      case 'pending': {
        return props.theme.color.grayDark;
      }
      case 'repairing': {
        return props.theme.color.greenLight;
      }
      default: {
        return props.theme.color.mainBlue;
      }
    }
  }};
`;

// type BackgroundColors = { [key in TStationStatuses]: string };

// const backgroundColors: BackgroundColors = {
//   unknown: '#656565',
//   working: '#0d85e1',
//   preparing: '#155EC2',
//   'ready to operate': '#3c8dff',
//   pending: '#8f8f8f',
//   repairing: '#c2159d',
//   'in progress': '#c14624',
// };
