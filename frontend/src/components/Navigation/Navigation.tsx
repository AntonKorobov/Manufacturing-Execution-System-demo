import { usePathname } from 'next/navigation';
import Image from 'next/image';

import { NavigationLink } from './NavigationLink/NavigationLink';

import * as S from './Navigation.styled';

export function Navigation() {
  const pathname = usePathname();

  return (
    <S.Navigation>
      <S.List>
        <S.Item>
          <NavigationLink
            href={'/stations'}
            className={pathname === '/stations' ? 'active' : ''}
          >
            <Image
              src={'/assets/stations_button_icon.svg'}
              width={45}
              height={45}
              alt="stations"
            />
            <S.LinkName>Stations</S.LinkName>
          </NavigationLink>
        </S.Item>
        <S.Item>
          <NavigationLink href={'/jobs'} className={pathname === '/jobs' ? 'active' : ''}>
            <Image
              src={'/assets/jobs_button_icon.svg'}
              width={45}
              height={45}
              alt="jobs"
            />
            <S.LinkName>Jobs</S.LinkName>
          </NavigationLink>
        </S.Item>
      </S.List>
    </S.Navigation>
  );
}
