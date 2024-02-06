import { gql } from '@apollo/client';

export const PUT_STATION_STATUS = gql`
  mutation PutStationStatus($id: Int!, $statusCode: Int!) {
    update_stations_by_pk(
      pk_columns: { id: $id }
      _set: { station_status_id: $statusCode }
    ) {
      id
      station_status_id
    }
  }
`;

export const PUT_JOB_OPERATION_QTY_OUT = gql`
  mutation PutJobOperationQtyOut($id: Int!, $qty: Int!) {
    update_job_operation(
      where: { operation_id: { _eq: $id } }
      _set: { job_operation_qty_out: $qty }
    ) {
      returning {
        id
        job_operation_qty_out
      }
    }
  }
`;

export const PUT_JOB_OPERATION_STATUS = gql`
  mutation PutJobOperationStatus($id: Int!, $statusCode: Int!, $duration: Int) {
    update_job_operation(
      where: { operation_id: { _eq: $id } }
      _set: { job_operation_status_id: $statusCode, job_operation_duration: $duration }
    ) {
      returning {
        job_operation_status_id
        operation_id
      }
    }
  }
`;

export const POST_OPERATION_LOG = ({
  jobId,
  logStartTime,
  logEndTime,
  logQtyIn,
  logQtyOut,
  logStatus,
  operationId,
}: {
  jobId: number;
  logStartTime: string | null;
  logEndTime: string | null;
  logQtyIn: number;
  logQtyOut: number;
  logStatus: number;
  operationId: number;
}) => `
  mutation {
    insert_logs(objects: {job_id: ${jobId}, log_start_time: ${logStartTime}, log_end_time: ${logEndTime}, log_qty_in: ${logQtyIn}, log_qty_out: ${logQtyOut}, log_status: ${logStatus}, operation_id: ${operationId}}) {
      returning {
        log_status
        log_end_time
        log_start_time
      }
    }
  }
`;

export const PUT_JOB_STATUS = ({
  id,
  statusCode,
}: {
  id: number;
  statusCode: number;
}) => `
  mutation {
    update_jobs(where: {id: {_eq: ${id}}}, _set: {job_status_id: ${statusCode}}) {
      returning {
        job_status {
          job_status_name
        }
      }
    }
  }
`;
