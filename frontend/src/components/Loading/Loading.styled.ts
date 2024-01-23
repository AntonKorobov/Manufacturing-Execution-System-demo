import styled from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const Loading = styled(CircularProgress)`
  svg {
    color: ${(props) => props.theme.color.mainBlue};
  }
`;
