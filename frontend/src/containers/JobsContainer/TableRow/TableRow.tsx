import { useEffect, useState } from 'react';

import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';

import { Loading } from '@/components/Loading/Loading';
import { ExpandButton } from '@/components/ExpandButton/ExpandButton';
import { ActionButton } from '@/components/ActionButton/ActionButton';
import { StatusIcon } from '@/components/StatusIcon/StatusIcon';
import { CounterInput } from '@/components/CounterInput/CounterInput';

import { useGetJobOperations } from '@/graphQL/useGetJobOperations';
import { usePostStationStatus } from '@/graphQL/usePostStationStatus';

import { convertMillisecondsToTime } from '@/utils/convertMillisecondsToTime';

import { Job, Operation } from '@/graphQL/types';
import { ActionButtonTypes } from '@/components/types';

import * as TABLE from '../constants';

import * as S from './TableRow.styled';

export function TableRow({ job }: { job: Job }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { operations, operationsError, operationsIsLoading } = useGetJobOperations({
    jobId: job.id,
    shouldFetch: isExpanded,
  });

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
          {job.job_status.job_status_name}
        </TableCell>
        <TableCell width={TABLE.COLUMN_WIDTH_7} align="center">
          <ExpandButton
            expand={isExpanded}
            onClick={() => setIsExpanded((prev) => !prev)}
          />
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
                  <OperationRow key={operation.operation.id} operation={operation} />
                ))}
            </TableBody>
          </S.Table>
        </S.TableCellInner>
      </S.TableRowInner>
    </>
  );
}

function OperationRow({ operation }: { operation: Operation }) {
  const { isStationStatusChanging, changeStationStatus } = usePostStationStatus({
    id: operation.operation.station.id,
  });

  const {
    hrs: expected_hrs,
    min: expected_min,
    sec: expected_sec,
  } = convertMillisecondsToTime(operation.operation.operation_expected_time);

  useEffect(() => {
    console.log('status is updating', isStationStatusChanging);
  }, [isStationStatusChanging]);

  return (
    <S.TableRow key={operation.operation.id}>
      <TableCell width={TABLE.COLUMN_WIDTH_1} align="right">
        {operation.operation.sequence}
      </TableCell>
      <TableCell width={TABLE.COLUMN_WIDTH_2}>
        {operation.operation.station.station_name}
      </TableCell>
      <TableCell width={TABLE.COLUMN_WIDTH_3} align="center" className="column3">
        {`${expected_hrs}:${expected_min}:${expected_sec}`}
      </TableCell>
      <TableCell width={TABLE.COLUMN_WIDTH_4} align="center" className="column3">
        {`${expected_hrs}:${expected_min}:${expected_sec}`}
      </TableCell>
      <TableCell width={TABLE.COLUMN_WIDTH_5} align="center">
        {operation.operation.station.id}
      </TableCell>
      <TableCell width={TABLE.COLUMN_WIDTH_6} align="center">
        <StatusIcon type={operation.operation.station.station_status.station_status_name}>
          {operation.operation.station.station_status.station_status_name}
        </StatusIcon>
      </TableCell>
      <TableCell width={TABLE.COLUMN_WIDTH_7} align="center">
        <S.ButtonsWrapper>
          <ActionButton
            type={ActionButtonTypes.START}
            onClick={() => changeStationStatus({ statusCode: 2 })}
          >
            Start
          </ActionButton>
          <ActionButton
            type={ActionButtonTypes.STOP}
            onClick={() => changeStationStatus({ statusCode: 5 })}
          >
            Stop
          </ActionButton>
          <CounterInput />
        </S.ButtonsWrapper>
      </TableCell>
    </S.TableRow>
  );
}
