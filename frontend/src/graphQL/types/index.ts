export enum StationStatusId {
  UNKNOWN = 1,
  WORKING,
  PREPARING,
  READY_TO_OPERATE,
  PENDING,
  REPAIRING,
  IN_PROGRESS,
}

export const StationStatusName = {
  [StationStatusId.UNKNOWN]: 'unknown',
  [StationStatusId.WORKING]: 'working',
  [StationStatusId.PREPARING]: 'preparing',
  [StationStatusId.READY_TO_OPERATE]: 'ready to operate',
  [StationStatusId.PENDING]: 'pending',
  [StationStatusId.REPAIRING]: 'repairing',
  [StationStatusId.IN_PROGRESS]: 'in progress',
};

export interface Station {
  id: number;
  station_code: string;
  station_img: string;
  station_name: string;
  station_type: string;
  station_status: {
    id: StationStatusId;
  };
}

export type getStationsResponse = {
  stations: Station[];
};

export enum OperationStatusId {
  UNKNOWN = 1,
  QUEUED,
  IN_PROGRESS,
  FINISHED,
}

export const OperationStatusName = {
  [OperationStatusId.UNKNOWN]: 'unknown',
  [OperationStatusId.QUEUED]: 'queued',
  [OperationStatusId.IN_PROGRESS]: 'in progress',
  [OperationStatusId.FINISHED]: 'finished',
};

export enum JobStatusId {
  UNKNOWN = 1,
  QUEUED,
  IN_PROGRESS,
  FINISHED,
}

export const JobStatusName = {
  [OperationStatusId.UNKNOWN]: 'unknown',
  [OperationStatusId.QUEUED]: 'queued',
  [OperationStatusId.IN_PROGRESS]: 'in progress',
  [OperationStatusId.FINISHED]: 'finished',
};

export interface Job {
  id: number;
  job_name: string;
  job_qty: number;
  job_status: {
    id: JobStatusId;
  };
  part: {
    part_img: string;
    part_name: string;
  };
  order: {
    order_name: string;
  };
}

export type getJobsResponse = { jobs: Job[] };

export interface JobOperation {
  operation: {
    station: {
      station_type: string;
      station_name: string;
      id: number;
    };
    operation_expected_time: number;
    sequence: number;
    id: number;
  };
  job_operation_duration: number;
  job_operation_qty_out: number;
  operation_status: {
    id: OperationStatusId;
  };
}

export type getJobOperationsResponse = { job_operation: JobOperation[] };
