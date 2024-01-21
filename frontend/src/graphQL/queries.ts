export const GET_STATIONS_QUERY = `
  query {
    stations {
      station_id
      station_code
      station_img
      station_name
      station_status {
        station_status_name
      }
      station_type
    }
  }
`;
