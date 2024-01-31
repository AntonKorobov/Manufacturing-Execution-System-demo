import styled from 'styled-components';

import { ReactNode } from 'react';

import { StationStatuses, OperationStatuses } from '@/graphQL/types';

interface StatusIconProps {
  children: ReactNode;
  type: StationStatuses | OperationStatuses;
}

export const StatusIcon = styled.div<StatusIconProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  width: 100%;
  padding: 0 20px;
  border-radius: 22px;
  font-family: ${(props) => props.theme.fontFamily.primary};
  font-size: ${(props) => props.theme.fontSize.lg};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  color: ${(props) => props.theme.color.mainWhite};
  background-color: ${(props) => {
    switch (props.type) {
      case StationStatuses.UNKNOWN: {
        return props.theme.color.grayDark;
      }
      case StationStatuses.WORKING: {
        return props.theme.color.brightBlue;
      }
      case StationStatuses.PREPARING: {
        return props.theme.color.greenLight;
      }
      case StationStatuses.READY_TO_OPERATE: {
        return props.theme.color.greenLight;
      }
      case StationStatuses.PENDING: {
        return props.theme.color.grayDark;
      }
      case StationStatuses.REPAIRING: {
        return props.theme.color.greenLight;
      }
      case OperationStatuses.UNKNOWN: {
        return props.theme.color.grayDark;
      }
      case OperationStatuses.QUEUED: {
        return props.theme.color.grayDark;
      }
      case OperationStatuses.IN_PROGRESS: {
        return props.theme.color.brightBlue;
      }
      case OperationStatuses.FINISHED: {
        return props.theme.color.greenLight;
      }
      default: {
        return props.theme.color.mainBlue;
      }
    }
  }};
`;
