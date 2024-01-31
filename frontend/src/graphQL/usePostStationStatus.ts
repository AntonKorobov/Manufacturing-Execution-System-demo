import useSWRMutation from 'swr/mutation';

const fetcher = (url: string, { arg }: { arg: { statusCode: number } }) =>
  fetch(url, {
    method: 'PUT',
    body: JSON.stringify({
      statusCode: arg.statusCode,
    }),
  }).then((res) => {
    if (!res.ok) {
      const error = new Error('An error occurred while fetching the data.');
      throw error;
    }
    return res.json();
  });

export function usePostStationStatus({ id }: { id: number }) {
  const { trigger, isMutating } = useSWRMutation(`/api/stations/${id}`, fetcher);

  return {
    isStationStatusChanging: isMutating,
    changeStationStatus: trigger,
  };
}
