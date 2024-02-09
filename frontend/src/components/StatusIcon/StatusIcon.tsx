import styled from 'styled-components';

import { ReactNode } from 'react';

import { StationStatusName, OperationStatusId, JobStatusId } from '@/graphQL/types';

interface StatusIconProps {
  children: ReactNode;
  type: StationStatusName | OperationStatusId | JobStatusId;
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
      case StationStatusName.UNKNOWN: {
        return props.theme.color.grayDark;
      }
      case StationStatusName.WORKING: {
        return props.theme.color.brightBlue;
      }
      case StationStatusName.PREPARING: {
        return props.theme.color.greenLight;
      }
      case StationStatusName.READY_TO_OPERATE: {
        return props.theme.color.greenLight;
      }
      case StationStatusName.PENDING: {
        return props.theme.color.grayDark;
      }
      case StationStatusName.REPAIRING: {
        return props.theme.color.greenLight;
      }
      case OperationStatusId.UNKNOWN: {
        return props.theme.color.grayDark;
      }
      case OperationStatusId.QUEUED: {
        return props.theme.color.grayDark;
      }
      case OperationStatusId.IN_PROGRESS: {
        return props.theme.color.brightBlue;
      }
      case OperationStatusId.FINISHED: {
        return props.theme.color.greenLight;
      }
      case JobStatusId.UNKNOWN: {
        return props.theme.color.grayDark;
      }
      case JobStatusId.QUEUED: {
        return props.theme.color.grayDark;
      }
      case JobStatusId.IN_PROGRESS: {
        return props.theme.color.brightBlue;
      }
      case JobStatusId.FINISHED: {
        return props.theme.color.greenLight;
      }
      default: {
        return props.theme.color.mainBlue;
      }
    }
  }};
`;
