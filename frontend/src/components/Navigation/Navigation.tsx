import Link from 'next/link';

import * as S from './Navigation.styled';

export function Navigation() {
  return (
    <S.Navigation>
      <ul>
        <li>
          <Link href={'/stations'}>Stations</Link>
        </li>
        <li>
          <Link href={'/jobs'}>Jobs</Link>
        </li>
      </ul>
    </S.Navigation>
  );
}
