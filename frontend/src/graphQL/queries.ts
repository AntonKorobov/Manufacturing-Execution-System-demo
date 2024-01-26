export const GET_STATIONS_QUERY = ({ page, limit }: { page: number; limit: number }) => `
  query {
    stations( 
      order_by: {id: asc},
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
      order_by: {id: asc},
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

export const GET_JOB_OPERATIONS = ({ jobId }: { jobId: number }) => `
  query {
    job_operation(
        where: {job_id: {_eq: ${jobId}}},
        order_by: {operation: {sequence: asc}}
      ) {
        operation {
          station {
            station_status {
              station_status_name
            }
            station_name
            id
          }
          operation_expected_time
          sequence
          id
        }
      }
  }
`;
