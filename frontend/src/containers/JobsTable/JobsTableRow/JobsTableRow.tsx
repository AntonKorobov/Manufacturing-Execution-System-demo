import { useState } from 'react';

import { Loading } from '@/components/Loading/Loading';
import { ExpandButton } from '@/components/ExpandButton/ExpandButton';
import { StatusIcon } from '@/components/StatusIcon/StatusIcon';
import { JobOperationsTableRow } from '../JobOperationsTableRow/JobOperationsTableRow';

import { useGetJobOperations } from '@/graphQL/useGetJobOperations';

import { Job, OperationStatuses } from '@/graphQL/types';

import * as TABLE from '../constants';

import * as S from './JobsTableRow.styled';

export function JobsTableRow({ job }: { job: Job }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const {
    operations,
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
          <StatusIcon type={job.job_status.job_status_name}>
            {job.job_status.job_status_name}
          </StatusIcon>
        </S.TableCell>
        <S.TableCell width={TABLE.COLUMN_WIDTH_7} align="center">
          <ExpandButton expand={isExpanded} onClick={handleExpand} />
        </S.TableCell>
      </S.JobTableRow>
      <S.JobTableRowInner style={{ display: isExpanded ? 'table-row' : 'none' }}>
        <S.TableCellInner colSpan={TABLE.COLUMNS_NUMBER} className="innerCell">
          {operationsIsLoading && <Loading size={60} height={100} />}
          {operations && (
            <S.Table>
              <S.TableBody>
                {operations.map((operation) => (
                  <JobOperationsTableRow
                    key={operation.operation.id}
                    operation={operation}
                    isValidating={operationsIsValidating}
                    revalidateOperations={revalidateOperations}
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