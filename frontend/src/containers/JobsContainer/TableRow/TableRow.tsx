import { useEffect, useState } from 'react';

import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';

import { Loading } from '@/components/Loading/Loading';
import { ExpandButton } from '@/components/ExpandButton/ExpandButton';
import { ActionButton } from '@/components/ActionButton/ActionButton';
import { StatusIcon } from '@/components/StatusIcon/StatusIcon';
// import { CounterInput } from '@/components/CounterInput/CounterInput';

import { useGetJobOperations } from '@/graphQL/useGetJobOperations';
import { usePostStationStatus } from '@/graphQL/usePostStationStatus';

import { Job, Operation } from '@/graphQL/types';
import { ActionButtonTypes } from '@/components/types';

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
        <TableCell width={'20%'}>{job.order.order_name}</TableCell>
        <TableCell width={'30%'}>{job.job_name}</TableCell>
        <TableCell width={'10%'} align="center">
          {job.job_qty}
        </TableCell>
        <TableCell width={'10%'} align="center">
          {job.job_status.job_status_name}
        </TableCell>
        <TableCell width={'30%'} align="center">
          <ExpandButton
            expand={isExpanded}
            onClick={() => setIsExpanded((prev) => !prev)}
          />
        </TableCell>
      </S.TableRow>
      <S.TableRowInner style={{ display: isExpanded ? 'table-row' : 'none' }}>
        <S.TableCellInner colSpan={5} className="innerCell">
          <S.Table>
            <TableBody>
              {operationsIsLoading && (
                <S.TableRow>
                  <S.TableCellInner colSpan={5} className="innerCell">
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

  useEffect(() => {
    console.log('status is updating', isStationStatusChanging);
  }, [isStationStatusChanging]);

  return (
    <S.TableRow key={operation.operation.id}>
      <TableCell width={'20%'} align="right">
        {operation.operation.sequence}
      </TableCell>
      <TableCell width={'30%'}>{operation.operation.station.station_name}</TableCell>
      <TableCell width={'10%'} align="center">
        {operation.operation.station.id}
      </TableCell>
      <TableCell width={'10%'} align="center">
        <StatusIcon type={operation.operation.station.station_status.station_status_name}>
          {operation.operation.station.station_status.station_status_name}
        </StatusIcon>
      </TableCell>
      <TableCell width={'30%'} align="center" colSpan={2}>
        <div style={{ display: 'flex', gap: '10px' }}>
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
          {/* <CounterInput /> */}
        </div>
      </TableCell>
    </S.TableRow>
  );
}
