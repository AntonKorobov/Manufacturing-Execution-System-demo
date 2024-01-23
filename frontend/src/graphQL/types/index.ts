export interface Station {
  id: number;
  station_code: string;
  station_img: string;
  station_name: string;
  station_type: string;
  station_status: {
    station_status_name: string;
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
