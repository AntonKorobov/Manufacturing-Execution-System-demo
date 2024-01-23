export const GET_STATIONS_QUERY = ({ page, limit }: { page: number; limit: number }) => `
  query {
    stations( 
      limit: ${limit},
      offset: ${page * limit} 
    ) {
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
