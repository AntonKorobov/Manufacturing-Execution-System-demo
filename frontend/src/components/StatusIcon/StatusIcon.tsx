import styled from 'styled-components';

import { ReactNode } from 'react';

import { StationStatusId, OperationStatusId, JobStatusId } from '@/graphQL/types';

interface StatusIconProps {
  children: ReactNode;
  type: StationStatusId | OperationStatusId | JobStatusId;
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
  background-color: ${(props) => props.theme.color.mainBlue};
`;

export const StationStatusIcon = styled(StatusIcon)<StatusIconProps>`
  background-color: ${(props) => {
    switch (props.type) {
      case StationStatusId.UNKNOWN: {
        return props.theme.color.grayDark;
      }
      case StationStatusId.WORKING: {
        return props.theme.color.brightBlue;
      }
      case StationStatusId.PREPARING: {
        return props.theme.color.greenLight;
      }
      case StationStatusId.READY_TO_OPERATE: {
        return props.theme.color.greenLight;
      }
      case StationStatusId.PENDING: {
        return props.theme.color.grayDark;
      }
      case StationStatusId.REPAIRING: {
        return props.theme.color.greenLight;
      }
      default: {
        return props.theme.color.mainBlue;
      }
    }
  }};
`;

export const JobStatusIcon = styled(StatusIcon)<StatusIconProps>`
  background-color: ${(props) => {
    switch (props.type) {
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

export const OperationStatusIcon = styled(StatusIcon)<StatusIconProps>`
  background-color: ${(props) => {
    switch (props.type) {
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
      default: {
        return props.theme.color.mainBlue;
      }
    }
  }};
`;
