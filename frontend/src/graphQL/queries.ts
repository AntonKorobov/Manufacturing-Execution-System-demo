import { gql } from '@apollo/client';

export const GET_STATIONS_QUERY = gql`
  query GetStationsQuery($limit: Int, $offset: Int) {
    stations(order_by: { id: asc }, limit: $limit, offset: $offset) {
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

export const GET_JOBS_QUERY = gql`
  query GetJobs_Query($limit: Int, $offset: Int) {
    jobs(order_by: { id: asc }, limit: $limit, offset: $offset) {
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

export const GET_JOB_OPERATIONS = gql`
  query GetJobOperations($id: Int) {
    job_operation(
      where: { job_id: { _eq: $id } }
      order_by: { operation: { sequence: asc } }
    ) {
      operation {
        station {
          station_name
          station_type
          id
        }
        id
        sequence
        operation_expected_time
      }
      job_operation_duration
      job_operation_qty_out
      operation_status {
        operation_status_name
      }
    }
  }
`;

export const GET_JOB_OPERATIONS_STATUSES = ({ jobId }: { jobId: number }) => `
  query {
    job_operation(
        where: {job_id: {_eq: ${jobId}}},
        order_by: {operation: {sequence: asc}}
      ) {
        operation_status {
          operation_status_name
        }
      }
  }
`;
