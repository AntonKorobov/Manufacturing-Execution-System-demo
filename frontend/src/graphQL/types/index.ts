export enum StationStatuses {
  UNKNOWN = 'unknown',
  WORKING = 'working',
  PREPARING = 'preparing',
  READY_TO_OPERATE = 'ready to operate',
  PENDING = 'pending',
  REPAIRING = 'repairing',
  IN_PROGRESS = 'in progress',
}

export interface Station {
  id: number;
  station_code: string;
  station_img: string;
  station_name: string;
  station_type: string;
  station_status: {
    station_status_name: StationStatuses;
  };
}

export type getStationsResponse = Station[];

export enum OperationStatuses {
  UNKNOWN = 'unknown',
  QUEUED = 'queued',
  IN_PROGRESS = 'in progress',
  FINISHED = 'finished',
}

export interface Job {
  id: number;
  job_name: string;
  job_qty: number;
  job_status: {
    job_status_name: OperationStatuses;
  };
  part: {
    part_img: string;
    part_name: string;
  };
  order: {
    order_name: string;
  };
}

export type getJobsResponse = Job[];

export interface Operation {
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
    operation_status_name: OperationStatuses;
  };
}

export type getJobOperationsResponse = Operation[];
