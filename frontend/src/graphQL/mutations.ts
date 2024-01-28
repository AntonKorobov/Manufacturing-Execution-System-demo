export const PUT_STATION_STATUS = ({
  id,
  statusCode,
}: {
  id: number;
  statusCode: number;
}) => `
  mutation {
    update_stations_by_pk(pk_columns: {id: ${id}}, _set: {station_status_id: ${statusCode}}) {
      id
      station_status_id
    }
  }
`;

export const PUT_JOB_OPERATION_QTY_OUT = ({ id, qty }: { id: number; qty: number }) => `
mutation {
    update_job_operation_by_pk(pk_columns: {id: ${id}}, _set: {job_operation_qty_out: ${qty}}) {
      id
      job_operation_qty_out
    }
  }
`;

export const PUT_JOB_OPERATION_STATUS = ({
  id,
  statusCode,
}: {
  id: number;
  statusCode: number;
}) => `
  mutation {
    update_job_operation_by_pk(pk_columns: {id: ${id}}, _set: {job_operation_status_id: ${statusCode}}) {
      id
      job_operation_status_id
    }
  }
`;
