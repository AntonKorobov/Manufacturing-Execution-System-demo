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
  code: string;
  img: string;
  name: string;
  type: string;
  status: StationStatusId;
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
  name: string;
  qty: number;
  status: JobStatusId;
  part: {
    img: string;
    name: string;
  };
  order: {
    name: string;
  };
}

export type getJobsResponse = { jobs: Job[] };

export interface JobOperation {
  operation: {
    station: {
      type: string;
      name: string;
      id: number;
    };
    expected_time: number;
    sequence: number;
    id: number;
  };
  duration: number;
  qty_out: number;
  status: OperationStatusId;
}

export type getJobOperationsResponse = { job_operation: JobOperation[] };
