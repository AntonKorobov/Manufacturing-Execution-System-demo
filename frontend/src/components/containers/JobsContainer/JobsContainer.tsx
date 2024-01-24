import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';

import { TableRow } from './TableRow/TableRow';

import { getJobsResponse } from '@/graphQL/types';

import * as S from './JobsContainer.styled';

export function JobsContainer({ jobs }: { jobs: getJobsResponse }) {
  return (
    <S.TableContainer>
      <S.Table aria-label="simple table">
        <S.TableHead>
          <S.TableRow>
            <TableCell width={'20%'} className="column1">
              Order name
            </TableCell>
            <TableCell width={'30%'} className="column2">
              Name
            </TableCell>
            <TableCell width={'10%'} align="center" className="column3">
              Qty
            </TableCell>
            <TableCell width={'10%'} align="center" className="column4">
              Status
            </TableCell>
            <TableCell width={'30%'} align="center" className="column4">
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
