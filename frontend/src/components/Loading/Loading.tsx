import styled from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';

export const Loading = styled(CircularProgress)`
  display: flex;
  svg {
    color: ${(props) => props.theme.color.mainBlue};
  }
`;
