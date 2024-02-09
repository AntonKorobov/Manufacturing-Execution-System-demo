import { useState } from 'react';

import { NetworkStatus, useQuery } from '@apollo/client';

import { Loading } from '@/components/Loading/Loading';
import { ExpandButton } from '@/components/ExpandButton/ExpandButton';
import { JobStatusIcon } from '@/components/StatusIcon/StatusIcon';
import { JobOperationsTableRow } from '../JobOperationsTableRow/JobOperationsTableRow';

import { GET_JOB_OPERATIONS_QUERY } from '@/graphQL/queries';

import { Job, OperationStatusId, JobStatusName } from '@/graphQL/types';

import * as TABLE from '../constants';

import * as S from './JobsTableRow.styled';

interface JobsTableRowProps {
  job: Job;
}

export function JobsTableRow({ job }: JobsTableRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const { data: operations, networkStatus } = useQuery(GET_JOB_OPERATIONS_QUERY, {
    variables: {
      id: job.id,
    },
    pollInterval: 1000,
    skip: !isExpanded,
    notifyOnNetworkStatusChange: true,
  });

  const handleExpand = () => {
    let hasInProgressStatus = false;

    operations?.job_operation.forEach((operation) => {
      if (operation.operation_status.id === OperationStatusId.IN_PROGRESS) {
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
      <S.JobTableRow>
        <S.TableCell width={TABLE.COLUMN_WIDTH_1}>{job.order.order_name}</S.TableCell>
        <S.TableCell width={TABLE.COLUMN_WIDTH_2}>{job.job_name}</S.TableCell>
        <S.TableCell width={TABLE.COLUMN_WIDTH_3} align="center">
          Sum
        </S.TableCell>
        <S.TableCell width={TABLE.COLUMN_WIDTH_4} align="center">
          Sum
        </S.TableCell>
        <S.TableCell width={TABLE.COLUMN_WIDTH_5} align="center">
          {job.job_qty}
        </S.TableCell>
        <S.TableCell width={TABLE.COLUMN_WIDTH_6} align="center">
          <JobStatusIcon type={job.job_status.id}>
            {JobStatusName[job.job_status.id]}
          </JobStatusIcon>
        </S.TableCell>
        <S.TableCell width={TABLE.COLUMN_WIDTH_7} align="center">
          <ExpandButton expand={isExpanded} onClick={handleExpand} />
        </S.TableCell>
      </S.JobTableRow>
      <S.JobTableRowInner style={{ display: isExpanded ? 'table-row' : 'none' }}>
        <S.TableCellInner colSpan={TABLE.COLUMNS_NUMBER} className="innerCell">
          {networkStatus === NetworkStatus.loading && <Loading size={60} height={100} />}
          {operations && (
            <S.Table>
              <S.TableBody>
                {operations.job_operation.map((operation) => (
                  <JobOperationsTableRow
                    key={operation.operation.id}
                    operation={operation}
                    isJobValidating={networkStatus === NetworkStatus.refetch}
                    jobQty={job.job_qty}
                  />
                ))}
              </S.TableBody>
            </S.Table>
          )}
        </S.TableCellInner>
      </S.JobTableRowInner>
    </>
  );
}
