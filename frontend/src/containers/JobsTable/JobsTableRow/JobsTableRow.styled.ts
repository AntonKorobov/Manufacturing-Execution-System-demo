import styled from 'styled-components';

import { Table as TableMUI } from '@mui/material/';
import { TableRow as TableRowMUI } from '@mui/material/';
import { TableCell as TableCellMUI } from '@mui/material/';
import { TableBody as TableBodyMUI } from '@mui/material/';

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

export const JobTableRow = styled(TableRowMUI)``;

export const JobTableRowInner = styled(TableRowMUI)`
  background-color: ${(props) => props.theme.color.grayLight};
`;

export const TableCell = styled(TableCellMUI)``;

export const TableCellInner = styled(TableCellMUI)`
  padding: 0;
`;

export const TableBody = styled(TableBodyMUI)``;
