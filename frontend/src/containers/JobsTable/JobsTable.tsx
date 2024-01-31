import { JobsTableRow } from './JobsTableRow/JobsTableRow';

import { getJobsResponse } from '@/graphQL/types';

import * as TABLE from './constants';

import * as S from './JobsTable.styled';

export function JobsTable({ jobs }: { jobs: getJobsResponse }) {
  return (
    <S.TableContainer>
      <S.Table aria-label="simple table">
        <S.TableHead>
          <S.TableRow>
            <S.TableCell width={TABLE.COLUMN_WIDTH_1}>Order name</S.TableCell>
            <S.TableCell width={TABLE.COLUMN_WIDTH_2}>Job name</S.TableCell>
            <S.TableCell width={TABLE.COLUMN_WIDTH_3} align="center">
              Expected time
            </S.TableCell>
            <S.TableCell width={TABLE.COLUMN_WIDTH_4} align="center">
              Processed time
            </S.TableCell>
            <S.TableCell width={TABLE.COLUMN_WIDTH_5} align="center">
              Qty
            </S.TableCell>
            <S.TableCell width={TABLE.COLUMN_WIDTH_6} align="center">
              Status
            </S.TableCell>
            <S.TableCell width={TABLE.COLUMN_WIDTH_7} align="center">
              Actions
            </S.TableCell>
          </S.TableRow>
        </S.TableHead>
        <S.TableBody>
          {jobs.map((job) => (
            <JobsTableRow job={job} key={job.id} />
          ))}
        </S.TableBody>
      </S.Table>
    </S.TableContainer>
  );
}
