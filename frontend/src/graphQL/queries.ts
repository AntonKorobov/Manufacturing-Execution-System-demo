export const GET_STATIONS_QUERY = `
  query {
    stations {
      id
      station_img
      station_name
      station_type
      station_code
      station_status {
        station_status_name
      }
    }
  }
`;
