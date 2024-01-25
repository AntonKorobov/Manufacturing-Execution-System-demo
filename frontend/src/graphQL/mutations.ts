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
