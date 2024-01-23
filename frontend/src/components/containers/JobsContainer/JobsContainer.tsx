import { StationCard } from '@/components/StationCard/StationCard';

import { getJobsResponse } from '@/graphQL/types';

import * as S from './JobsContainer.styled';

export function JobsContainer({ jobs }: { jobs: getJobsResponse }) {
  return (
    <S.Container>
      {jobs.map((job) => {
        return (
          <StationCard
            key={job.id}
            stationImgUrl={job.part.part_img}
            stationName={job.job_name}
            stationCode={job.job_qty.toString()}
            stationStatus={job.job_status.job_status_name}
            stationType={job.order.order_name}
          />
        );
      })}
    </S.Container>
  );
}
