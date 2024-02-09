import { gql } from '@apollo/client';

export const PUT_STATION_STATUS = gql`
  mutation PutStationStatus($id: Int!, $statusCode: Int!) {
    update_stations_by_pk(pk_columns: { id: $id }, _set: { status: $statusCode }) {
      id
      status
    }
  }
`;

export const PUT_JOB_OPERATION_QTY_OUT = gql`
  mutation PutJobOperationQtyOut($id: Int!, $qty: Int!) {
    update_job_operation(where: { operation_id: { _eq: $id } }, _set: { qty_out: $qty }) {
      returning {
        id
        qty_out
      }
    }
  }
`;

export const PUT_JOB_OPERATION_STATUS = gql`
  mutation PutJobOperationStatus($id: Int!, $statusCode: Int!, $duration: Int!) {
    update_job_operation(
      where: { operation_id: { _eq: $id } }
      _set: { status: $statusCode, duration: $duration }
    ) {
      returning {
        status
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
    insert_logs(objects: {job_id: ${jobId}, start_time: ${logStartTime}, end_time: ${logEndTime}, qty_in: ${logQtyIn}, qty_out: ${logQtyOut}, status: ${logStatus}, operation_id: ${operationId}}) {
      returning {
        status
        end_time
        start_time
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
    update_jobs(where: {id: {_eq: ${id}}}, _set: {status: ${statusCode}}) {
      returning {
        status
      }
    }
  }
`;
