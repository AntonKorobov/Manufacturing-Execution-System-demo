import styled from 'styled-components';
import {
  Pagination as PaginationMUI,
  PaginationItem as PaginationItemMUI,
} from '@mui/material';

export const Pagination = styled(PaginationMUI)`
  .Mui-selected {
    background-color: ${(props) => props.theme.color.mainBlue};
    color: ${(props) => props.theme.color.mainWhite};
  }
  .MuiPagination-ul {
    gap: 10px;
  }
  .MuiPaginationItem-ellipsis {
    font-size: ${(props) => props.theme.fontSize.xxl};
  }
  button {
    width: 60px;
    height: 60px;
    border: 2px solid ${(props) => props.theme.color.mainBlue};
    &:hover {
      border: 4px solid ${(props) => props.theme.color.mainBlue};
    }
    font-size: ${(props) => props.theme.fontSize.xxl};
  }
`;

export const PaginationItem = styled(PaginationItemMUI)``;
