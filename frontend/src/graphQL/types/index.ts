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
