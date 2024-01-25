import { useEffect, useState } from 'react';

import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';

import { Loading } from '@/components/Loading/Loading';
import { ExpandButton } from '@/components/ExpandButton/ExpandButton';
import { ActionButton } from '@/components/ActionButton/ActionButton';
// import { CounterInput } from '@/components/CounterInput/CounterInput';

import { useGetStations } from '@/graphQL/useGetStations';
import { usePostStationStatus } from '@/graphQL/usePostStationStatus';

import { Job, Station } from '@/graphQL/types';

import * as S from './TableRow.styled';

export function TableRow({ job }: { job: Job }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { stations, stationsError, stationsIsLoading } = useGetStations({
    pageNumber: 0,
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
              {stationsIsLoading && (
                <S.TableRow>
                  <S.TableCellInner colSpan={5} className="innerCell">
                    <Loading size={40} height={100} />
                  </S.TableCellInner>
                </S.TableRow>
              )}
              {stations &&
                stations.map((station, index) => (
                  <StationRow key={station.id} station={station} index={index} />
                ))}
            </TableBody>
          </S.Table>
        </S.TableCellInner>
      </S.TableRowInner>
    </>
  );
}

function StationRow({ station, index }: { station: Station; index: number }) {
  const { isStationStatusChanging, changeStationStatus } = usePostStationStatus({
    id: station.id,
  });

  useEffect(() => {
    console.log(isStationStatusChanging);
  }, [isStationStatusChanging]);

  return (
    <S.TableRow key={station.id + 'inner'}>
      <TableCell width={'20%'} align="right">
        {`${index + 1}.`}
      </TableCell>
      <TableCell width={'30%'}>{station.station_name}</TableCell>
      <TableCell width={'10%'} align="center">
        {station.station_code}
      </TableCell>
      <TableCell width={'10%'} align="center">
        {station.station_status.station_status_name}
      </TableCell>
      <TableCell width={'30%'} align="center" colSpan={2}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <ActionButton
            type="start"
            onClick={() => changeStationStatus({ statusCode: 2 })}
          >
            Start
          </ActionButton>
          <ActionButton
            type="stop"
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
