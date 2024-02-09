import { gql, TypedDocumentNode } from '@apollo/client';

import { getJobOperationsResponse, getJobsResponse, getStationsResponse } from './types';

export const GET_STATIONS_QUERY: TypedDocumentNode<
  getStationsResponse,
  { limit: number; offset: number }
> = gql`
  query GetStationsQuery($limit: Int!, $offset: Int!) {
    stations(order_by: { id: asc }, limit: $limit, offset: $offset) {
      id
      img
      name
      type
      code
      status
    }
  }
`;

export const GET_JOBS_QUERY: TypedDocumentNode<
  getJobsResponse,
  { limit: number; offset: number }
> = gql`
  query GetJobsQuery($limit: Int!, $offset: Int!) {
    jobs(order_by: { id: asc }, limit: $limit, offset: $offset) {
      id
      name
      qty
      status
      part {
        img
        name
      }
      order {
        name
      }
    }
  }
`;

export const GET_JOB_OPERATIONS_QUERY: TypedDocumentNode<
  getJobOperationsResponse,
  { id: number }
> = gql`
  query GetJobOperationsQuery($id: Int!) {
    job_operation(
      where: { job_id: { _eq: $id } }
      order_by: { operation: { sequence: asc } }
    ) {
      operation {
        station {
          name
          type
          id
        }
        id
        sequence
        expected_time
      }
      duration
      qty_out
      status
    }
  }
`;

export const GET_JOB_OPERATIONS_STATUSES_QUERY = ({ jobId }: { jobId: number }) => `
  query {
    job_operation(
        where: {job_id: {_eq: ${jobId}}},
        order_by: {operation: {sequence: asc}}
      ) {
        status
      }
  }
`;
