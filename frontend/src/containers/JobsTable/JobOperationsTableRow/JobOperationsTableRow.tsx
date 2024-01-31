import { useState } from 'react';

import { ActionButton } from '@/components/ActionButton/ActionButton';
import { CounterInput } from '@/components/CounterInput/CounterInput';
import { Loading } from '@/components/Loading/Loading';
import { StatusIcon } from '@/components/StatusIcon/StatusIcon';

import { usePostJobOperationStatus } from '@/graphQL/usePostJobOperationStatus';
import { usePostStationStatus } from '@/graphQL/usePostStationStatus';
import { usePostJobOperationQty } from '@/graphQL/usePostJobOperationQty';
import { useIsUpdating } from '@/hooks/useIsUpdating';
import { useTimer } from '@/hooks/useTimer';

import { convertSecondsToTime } from '@/utils/convertSecondsToTime';

import { ActionButtonTypes } from '@/components/types';
import { Operation, OperationStatuses } from '@/graphQL/types';

import * as TABLE from '../constants';

import * as S from './JobOperationsTableRow.styled';

export function JobOperationsTableRow({
  operation,
  isValidating,
  revalidateOperations,
  jobQty,
}: {
  operation: Operation;
  isValidating: boolean;
  revalidateOperations: VoidFunction;
  jobQty: number;
}) {
  const { isStationStatusChanging, changeStationStatus } = usePostStationStatus({
    id: operation.operation.station.id,
  });

  const { isJobOperationQtyChanging, changeJobOperationQty } = usePostJobOperationQty({
    id: operation.operation.id,
  });

  const { isJobOperationStatusChanging, changeJobOperationStatus } =
    usePostJobOperationStatus({
      id: operation.operation.id,
    });

  const {
    hrs: expected_hrs,
    min: expected_min,
    sec: expected_sec,
  } = convertSecondsToTime(operation.operation.operation_expected_time);

  const {
    seconds: timerSeconds,
    start: startTimer,
    pause: pauseTimer,
    reset: resetTimer,
  } = useTimer({
    initialSeconds: operation.job_operation_duration,
    initiallyRunning: false,
  });

  const {
    hrs: processed_hrs,
    min: processed_min,
    sec: processed_sec,
  } = convertSecondsToTime(timerSeconds);

  const [currentQty, setCurrentQty] = useState(operation.job_operation_qty_out);

  const [isUpdating] = useIsUpdating({
    isMutating: [
      isStationStatusChanging,
      isJobOperationQtyChanging,
      isJobOperationStatusChanging,
    ],
    isValidating: isValidating,
    forceRevalidation: [revalidateOperations],
  });

  return (
    <S.TableRow key={operation.operation.id}>
      <S.TableCell width={TABLE.COLUMN_WIDTH_1} align="right">
        {operation.operation.sequence}
      </S.TableCell>
      <S.TableCell width={TABLE.COLUMN_WIDTH_2}>
        <S.StationWrapper>
          {operation.operation.station.station_name}
          {` (${operation.operation.station.station_type})`}
        </S.StationWrapper>
      </S.TableCell>
      <S.TableCell width={TABLE.COLUMN_WIDTH_3} align="center">
        {`${expected_hrs}:${expected_min}:${expected_sec}`}
      </S.TableCell>
      <S.TableCell width={TABLE.COLUMN_WIDTH_4} align="center">
        {`${processed_hrs}:${processed_min}:${processed_sec}`}
      </S.TableCell>
      <S.TableCell width={TABLE.COLUMN_WIDTH_5} align="center">
        {!isUpdating ? (
          `${operation.job_operation_qty_out}/${jobQty}`
        ) : (
          <Loading size={20} />
        )}
      </S.TableCell>
      <S.TableCell width={TABLE.COLUMN_WIDTH_6} align="center">
        <StatusIcon type={operation.operation_status.operation_status_name}>
          {!isUpdating ? (
            operation.operation_status.operation_status_name
          ) : (
            <Loading size={20} />
          )}
        </StatusIcon>
      </S.TableCell>
      <S.TableCell width={TABLE.COLUMN_WIDTH_7} align="center">
        <S.ButtonsWrapper>
          {operation.operation_status.operation_status_name ===
            OperationStatuses.QUEUED && (
            <ActionButton
              type={ActionButtonTypes.START}
              onClick={() => {
                startTimer();
                changeStationStatus({ statusCode: 2 });
                changeJobOperationStatus({ statusCode: 3, duration: timerSeconds });
              }}
            >
              Start
            </ActionButton>
          )}
          {operation.operation_status.operation_status_name ===
            OperationStatuses.IN_PROGRESS && (
            <>
              <ActionButton
                type={ActionButtonTypes.STOP}
                onClick={() => {
                  pauseTimer();
                  changeStationStatus({ statusCode: 5 });
                  currentQty >= jobQty
                    ? changeJobOperationStatus({
                        statusCode: 4,
                        duration: timerSeconds,
                      })
                    : changeJobOperationStatus({
                        statusCode: 2,
                        duration: timerSeconds,
                      });
                }}
              >
                Stop
              </ActionButton>
              <CounterInput
                value={currentQty}
                onChange={(value) => {
                  resetTimer();
                  setCurrentQty(value);
                  changeJobOperationQty({ qty: value });
                }}
              />
            </>
          )}
        </S.ButtonsWrapper>
      </S.TableCell>
    </S.TableRow>
  );
}
