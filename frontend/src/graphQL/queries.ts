export const GET_STATIONS_QUERY = ({ page, limit }: { page: number; limit: number }) => `
  query {
    stations( 
      limit: ${limit},
      offset: ${page * limit} 
    ) {
      id
      station_img
      station_name
      station_type
      station_code
      station_status {
        station_status_name
      }
    }
  }
`;

export const GET_JOBS_QUERY = ({ page, limit }: { page: number; limit: number }) => `
  query {
    jobs( 
      limit: ${limit},
      offset: ${page * limit} 
    ) {
      id
      job_name
      job_qty
      job_status {
        job_status_name
      }
      part {
        part_img
        part_name
      }
      order {
        order_name
      }
    }
  }
`;
