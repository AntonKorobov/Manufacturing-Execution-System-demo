import { getJobsResponse } from '@/graphQL/types';

import * as S from './JobsContainer.styled';

import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';

export function JobsContainer({ jobs }: { jobs: getJobsResponse }) {
  return (
    <S.TableContainer>
      <S.Table aria-label="simple table">
        <S.TableHead>
          <S.TableRow>
            <TableCell width={'30%'} className="column1">
              Order name
            </TableCell>
            <TableCell width={'30%'} className="column2">
              Name
            </TableCell>
            <TableCell width={'20%'} align="center" className="column3">
              Qty
            </TableCell>
            <TableCell width={'20%'} align="center" className="column4">
              Status
            </TableCell>
          </S.TableRow>
        </S.TableHead>
        <TableBody>
          {jobs.map((row) => (
            <S.TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell width={'30%'}>{row.order.order_name}</TableCell>
              <TableCell width={'30%'}>{row.job_name}</TableCell>
              <TableCell width={'20%'} align="center">
                {row.job_qty}
              </TableCell>
              <TableCell width={'20%'} align="center">
                {row.job_status.job_status_name}
              </TableCell>
            </S.TableRow>
          ))}
        </TableBody>
      </S.Table>
    </S.TableContainer>
  );
}
