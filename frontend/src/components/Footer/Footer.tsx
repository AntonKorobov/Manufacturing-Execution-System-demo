import { Pagination } from '@/components/Pagination/Pagination';

import * as S from './Footer.styled';

export function Footer() {
  return (
    <S.Footer>
      <Pagination page={0} handleChange={() => {}} />
    </S.Footer>
  );
}
