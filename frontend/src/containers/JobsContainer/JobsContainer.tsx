import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';

import { TableRow } from './TableRow/TableRow';

import { getJobsResponse } from '@/graphQL/types';

import * as TABLE from './constants';

import * as S from './JobsContainer.styled';

export function JobsContainer({ jobs }: { jobs: getJobsResponse }) {
  return (
    <S.TableContainer>
      <S.Table aria-label="simple table">
        <S.TableHead>
          <S.TableRow>
            <TableCell width={TABLE.COLUMN_WIDTH_1} className="column1">
              Order name
            </TableCell>
            <TableCell width={TABLE.COLUMN_WIDTH_2} className="column2">
              Job name
            </TableCell>
            <TableCell width={TABLE.COLUMN_WIDTH_3} align="center" className="column3">
              Expected time
            </TableCell>
            <TableCell width={TABLE.COLUMN_WIDTH_4} align="center" className="column3">
              Processed time
            </TableCell>
            <TableCell width={TABLE.COLUMN_WIDTH_5} align="center" className="column3">
              Qty
            </TableCell>
            <TableCell width={TABLE.COLUMN_WIDTH_6} align="center" className="column4">
              Status
            </TableCell>
            <TableCell width={TABLE.COLUMN_WIDTH_7} align="center" className="column4">
              Actions
            </TableCell>
          </S.TableRow>
        </S.TableHead>
        <TableBody>
          {jobs && jobs.map((job) => <TableRow job={job} key={job.id} />)}
        </TableBody>
      </S.Table>
    </S.TableContainer>
  );
}
