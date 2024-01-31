import styled from 'styled-components';

import { Table as TableMUI } from '@mui/material/';
import { TableHead as TableHeadMUI } from '@mui/material/';
import { TableBody as TableBodyMUI } from '@mui/material/';
import { TableRow as TableRowMUI } from '@mui/material/';
import { TableCell as TableCellMUI } from '@mui/material/';

export const TableContainer = styled.div`
  height: 100%;
  overflow: auto;
`;

export const Table = styled(TableMUI)`
  min-width: 800px;
  overflow-x: scroll;

  .innerCell {
    padding: 0;
  }

  th,
  td {
    padding: 10px;
    font-size: ${(props) => props.theme.fontSize.lg};
  }
`;

export const TableHead = styled(TableHeadMUI)`
  height: 100px;
  position: sticky;
  top: 0;
  background-color: ${(props) => props.theme.color.mainWhite};
  z-index: 1000;
`;

export const TableBody = styled(TableBodyMUI)``;

export const TableRow = styled(TableRowMUI)``;

export const TableCell = styled(TableCellMUI)``;
