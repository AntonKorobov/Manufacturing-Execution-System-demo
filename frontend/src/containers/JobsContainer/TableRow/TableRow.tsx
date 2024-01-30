import { useState } from 'react';

import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';

import { Loading } from '@/components/Loading/Loading';
import { ExpandButton } from '@/components/ExpandButton/ExpandButton';
import { ActionButton } from '@/components/ActionButton/ActionButton';
import { StatusIcon } from '@/components/StatusIcon/StatusIcon';
import { CounterInput } from '@/components/CounterInput/CounterInput';

import { useGetJobOperations } from '@/graphQL/useGetJobOperations';
import { usePostStationStatus } from '@/graphQL/usePostStationStatus';
import { usePostJobOperationQty } from '@/graphQL/usePostJobOperationQty';
import { usePostJobOperationStatus } from '@/graphQL/usePostJobOperationStatus';
import { useIsUpdating } from '@/hooks/useIsUpdating';
import { useTimer } from '@/hooks/useTimer';

import { convertMillisecondsToTime } from '@/utils/convertMillisecondsToTime';

import { Job, Operation, OperationStatuses } from '@/graphQL/types';
import { ActionButtonTypes } from '@/components/types';

import * as TABLE from '../constants';

import * as S from './TableRow.styled';

export function TableRow({ job }: { job: Job }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const {
    operations,
    operationsError,
    operationsIsLoading,
    operationsIsValidating,
    revalidateOperations,
  } = useGetJobOperations({
    jobId: job.id,
    shouldFetch: isExpanded,
  });

  const handleExpand = () => {
    let hasInProgressStatus = false;

    operations?.forEach((operation) => {
      if (
        operation.operation_status.operation_status_name === OperationStatuses.IN_PROGRESS
      ) {
        hasInProgressStatus = true;
      }
    });

    if (hasInProgressStatus) {
      alert('Please, stop all operations before collapse the table');
    } else {
      setIsExpanded((prev) => !prev);
    }
  };

  return (
    <>
      <S.TableRow>
        <TableCell width={TABLE.COLUMN_WIDTH_1}>{job.order.order_name}</TableCell>
        <TableCell width={TABLE.COLUMN_WIDTH_2}>{job.job_name}</TableCell>
        <TableCell width={TABLE.COLUMN_WIDTH_3} align="center">
          Sum
        </TableCell>
        <TableCell width={TABLE.COLUMN_WIDTH_4} align="center">
          Sum
        </TableCell>
        <TableCell width={TABLE.COLUMN_WIDTH_5} align="center">
          {job.job_qty}
        </TableCell>
        <TableCell width={TABLE.COLUMN_WIDTH_6} align="center">
          <StatusIcon type={job.job_status.job_status_name}>
            {job.job_status.job_status_name}
          </StatusIcon>
        </TableCell>
        <TableCell width={TABLE.COLUMN_WIDTH_7} align="center">
          <ExpandButton expand={isExpanded} onClick={handleExpand} />
        </TableCell>
      </S.TableRow>
      <S.TableRowInner style={{ display: isExpanded ? 'table-row' : 'none' }}>
        <S.TableCellInner colSpan={TABLE.COLUMNS_NUMBER} className="innerCell">
          <S.Table>
            <TableBody>
              {operationsIsLoading && (
                <S.TableRow>
                  <S.TableCellInner colSpan={TABLE.COLUMNS_NUMBER} className="innerCell">
                    <Loading size={40} height={100} />
                  </S.TableCellInner>
                </S.TableRow>
              )}
              {operations &&
                operations.map((operation) => (
                  <OperationRow
                    key={operation.operation.id}
                    operation={operation}
                    isValidating={operationsIsValidating}
                    revalidateOperations={revalidateOperations}
                    jobQty={job.job_qty}
                  />
                ))}
            </TableBody>
          </S.Table>
        </S.TableCellInner>
      </S.TableRowInner>
    </>
  );
}

function OperationRow({
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
  } = convertMillisecondsToTime(operation.operation.operation_expected_time);

  const {
    seconds,
    start: startTimer,
    pause: pauseTimer,
  } = useTimer({
    initialSeconds: 0,
    initiallyRunning: false,
  });

  const {
    hrs: processed_hrs,
    min: processed_min,
    sec: processed_sec,
  } = convertMillisecondsToTime(operation.job_operation_duration + seconds * 1000);

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
      <TableCell width={TABLE.COLUMN_WIDTH_1} align="right">
        {operation.operation.sequence}
      </TableCell>
      <TableCell width={TABLE.COLUMN_WIDTH_2}>
        <S.StationWrapper>
          {operation.operation.station.station_name}
          {` (${operation.operation.station.station_type})`}
        </S.StationWrapper>
      </TableCell>
      <TableCell width={TABLE.COLUMN_WIDTH_3} align="center">
        {`${expected_hrs}:${expected_min}:${expected_sec}`}
      </TableCell>
      <TableCell width={TABLE.COLUMN_WIDTH_4} align="center">
        {`${processed_hrs}:${processed_min}:${processed_sec}`}
      </TableCell>
      <TableCell width={TABLE.COLUMN_WIDTH_5} align="center">
        {!isUpdating ? (
          `${operation.job_operation_qty_out}/${jobQty}`
        ) : (
          <Loading size={20} />
        )}
      </TableCell>
      <TableCell width={TABLE.COLUMN_WIDTH_6} align="center">
        <StatusIcon type={operation.operation_status.operation_status_name}>
          {!isUpdating ? (
            operation.operation_status.operation_status_name
          ) : (
            <Loading size={20} />
          )}
        </StatusIcon>
      </TableCell>
      <TableCell width={TABLE.COLUMN_WIDTH_7} align="center">
        <S.ButtonsWrapper>
          {operation.operation_status.operation_status_name ===
            OperationStatuses.QUEUED && (
            <ActionButton
              type={ActionButtonTypes.START}
              onClick={() => {
                startTimer();
                changeStationStatus({ statusCode: 2 });
                changeJobOperationStatus({ statusCode: 3, duration: seconds * 1000 });
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
                        duration: seconds * 1000,
                      })
                    : changeJobOperationStatus({
                        statusCode: 2,
                        duration: seconds * 1000,
                      });
                }}
              >
                Stop
              </ActionButton>
              <CounterInput
                value={currentQty}
                onChange={(value) => {
                  setCurrentQty(value);
                  changeJobOperationQty({ qty: value });
                }}
              />
            </>
          )}
        </S.ButtonsWrapper>
      </TableCell>
    </S.TableRow>
  );
}
