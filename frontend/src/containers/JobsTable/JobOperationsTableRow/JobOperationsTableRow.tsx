import { useMutation } from '@apollo/client';

import { useMemo, useState } from 'react';

import { ActionButton } from '@/components/ActionButton/ActionButton';
import { CounterInput } from '@/components/CounterInput/CounterInput';
import { Loading } from '@/components/Loading/Loading';
import { OperationStatusIcon } from '@/components/StatusIcon/StatusIcon';

import { useIsUpdating } from '@/hooks/useIsUpdating';
import { useTimer } from '@/hooks/useTimer';

import { convertSecondsToTime } from '@/utils/convertSecondsToTime';

import { ActionButtonTypes } from '@/components/types';
import {
  JobOperation,
  OperationStatusId,
  OperationStatusName,
  StationStatusId,
} from '@/graphQL/types';

import * as TABLE from '../constants';
import {
  PUT_JOB_OPERATION_QTY_OUT,
  PUT_JOB_OPERATION_STATUS,
  PUT_STATION_STATUS,
} from '@/graphQL/mutations';
import { GET_JOB_OPERATIONS_QUERY } from '@/graphQL/queries';

import * as S from './JobOperationsTableRow.styled';

interface JobOperationsTableRowProps {
  operation: JobOperation;
  isJobValidating: boolean;
  jobQty: number;
}

export function JobOperationsTableRow({
  operation,
  isJobValidating,
  jobQty,
}: JobOperationsTableRowProps) {
  const [currentQty, setCurrentQty] = useState(operation.qty_out);

  const [mutateStationStatus, { loading: loadingStationStatus }] = useMutation(
    PUT_STATION_STATUS,
    {
      variables: {
        id: operation.operation.station.id,
      },
    }
  );

  const [mutateJobOperationQty, { loading: loadingJobOperationQty }] = useMutation(
    PUT_JOB_OPERATION_QTY_OUT,
    {
      variables: {
        id: operation.operation.id,
      },
      refetchQueries: [GET_JOB_OPERATIONS_QUERY],
    }
  );

  const [mutateJobOperationStatus, { loading: loadingJobOperationStatus }] = useMutation(
    PUT_JOB_OPERATION_STATUS,
    {
      variables: {
        id: operation.operation.id,
      },
      refetchQueries: [GET_JOB_OPERATIONS_QUERY],
    }
  );

  const {
    seconds: timerSeconds,
    start: startTimer,
    pause: pauseTimer,
    reset: resetTimer,
  } = useTimer({
    initialSeconds: operation.duration,
    initiallyRunning: false,
  });

  const {
    hrs: expected_hrs,
    min: expected_min,
    sec: expected_sec,
  } = convertSecondsToTime(operation.operation.expected_time);

  const {
    hrs: processed_hrs,
    min: processed_min,
    sec: processed_sec,
  } = convertSecondsToTime(timerSeconds);

  const mutationStatuses = useMemo(
    () => [loadingStationStatus, loadingJobOperationQty, loadingJobOperationStatus],
    [loadingStationStatus, loadingJobOperationQty, loadingJobOperationStatus]
  );
  const [isUpdating] = useIsUpdating({
    isMutating: mutationStatuses,
    isValidating: isJobValidating,
  });

  const handleClickStartButton = () => {
    startTimer();

    mutateStationStatus({ variables: { statusCode: StationStatusId.WORKING } });
    mutateJobOperationStatus({
      variables: { statusCode: OperationStatusId.IN_PROGRESS, duration: timerSeconds },
    });
  };

  const handleClickStopButton = () => {
    pauseTimer();

    mutateStationStatus({ variables: { statusCode: StationStatusId.PENDING } });
    currentQty >= jobQty
      ? mutateJobOperationStatus({
          variables: { statusCode: OperationStatusId.FINISHED, duration: timerSeconds },
        })
      : mutateJobOperationStatus({
          variables: { statusCode: OperationStatusId.QUEUED, duration: timerSeconds },
        });
  };

  const handleChangeCounterInput = (value: number) => {
    resetTimer();

    if (value >= 0 && value <= jobQty) {
      setCurrentQty(value);
      mutateJobOperationQty({
        variables: {
          qty: value,
        },
      });
    }
  };

  return (
    <S.TableRow key={operation.operation.id}>
      <S.TableCell width={TABLE.COLUMN_WIDTH_1} align="right">
        {operation.operation.sequence}
      </S.TableCell>
      <S.TableCell width={TABLE.COLUMN_WIDTH_2}>
        <S.StationWrapper>
          {operation.operation.station.name}
          {` (${operation.operation.station.type})`}
        </S.StationWrapper>
      </S.TableCell>
      <S.TableCell width={TABLE.COLUMN_WIDTH_3} align="center">
        {`${expected_hrs}:${expected_min}:${expected_sec}`}
      </S.TableCell>
      <S.TableCell width={TABLE.COLUMN_WIDTH_4} align="center">
        {`${processed_hrs}:${processed_min}:${processed_sec}`}
      </S.TableCell>
      <S.TableCell width={TABLE.COLUMN_WIDTH_5} align="center">
        {!isUpdating ? `${operation.qty_out}/${jobQty}` : <Loading size={20} />}
      </S.TableCell>
      <S.TableCell width={TABLE.COLUMN_WIDTH_6} align="center">
        <OperationStatusIcon type={operation.status}>
          {!isUpdating ? OperationStatusName[operation.status] : <Loading size={20} />}
        </OperationStatusIcon>
      </S.TableCell>
      <S.TableCell width={TABLE.COLUMN_WIDTH_7} align="center">
        <S.ButtonsWrapper>
          {operation.status === OperationStatusId.QUEUED && (
            <ActionButton type={ActionButtonTypes.START} onClick={handleClickStartButton}>
              Start
            </ActionButton>
          )}
          {operation.status === OperationStatusId.IN_PROGRESS && (
            <>
              <ActionButton type={ActionButtonTypes.STOP} onClick={handleClickStopButton}>
                Stop
              </ActionButton>
              <CounterInput value={currentQty} onChange={handleChangeCounterInput} />
            </>
          )}
        </S.ButtonsWrapper>
      </S.TableCell>
    </S.TableRow>
  );
}
