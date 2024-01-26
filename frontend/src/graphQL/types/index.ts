// export type TStationStatuses =
//   | 'unknown'
//   | 'working'
//   | 'preparing'
//   | 'ready to operate'
//   | 'pending'
//   | 'repairing'
//   | 'in progress';

export enum StationTypes {
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
    station_status_name: StationTypes;
  };
}

export type getStationsResponse = Station[];

export interface Job {
  id: number;
  job_name: string;
  job_qty: number;
  job_status: {
    job_status_name: string;
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

// if (someServerThing === StationTypes.UNKNOWN)

// switch (StationTypes) {
//   case
// }

// StationTypes.

// export enum TStationStatuses {
//   'unknown' = 1,
//   'working',
//   'preparing',
//   'ready to operate',
//   'pending',
//   'repairing',
//   'in progress',
// }
