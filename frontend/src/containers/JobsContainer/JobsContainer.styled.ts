import styled from 'styled-components';

import { Table as TableMUI } from '@mui/material/';
import { TableHead as TableHeadMUI } from '@mui/material/';
import { TableRow as TableRowMUI } from '@mui/material/';
import { TableCell as TableCellMUI } from '@mui/material/';

export const TableContainer = styled.div`
  height: calc(100vh - 200px);
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
    font-size: ${(props) => props.theme.fontSize.xl};
  }
`;

export const TableHead = styled(TableHeadMUI)`
  height: 100px;
`;

export const TableRow = styled(TableRowMUI)``;

export const TableRowInner = styled(TableRowMUI)`
  background-color: ${(props) => props.theme.color.grayLight};
`;

export const TableCellInner = styled(TableCellMUI)`
  padding: 0;
`;
