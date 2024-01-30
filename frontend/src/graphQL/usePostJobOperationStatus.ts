import useSWRMutation from 'swr/mutation';

const fetcher = (
  url: string,
  { arg }: { arg: { statusCode: number; duration: number } }
) =>
  fetch(url, {
    method: 'PUT',
    body: JSON.stringify({
      statusCode: arg.statusCode,
      duration: arg.duration,
    }),
  }).then((res) => {
    if (!res.ok) {
      const error = new Error('An error occurred while fetching the data.');
      throw error;
    }
    return res.json();
  });

export function usePostJobOperationStatus({ id }: { id: number }) {
  const { trigger, isMutating } = useSWRMutation(`/api/job-operations/${id}`, fetcher);

  return {
    isJobOperationStatusChanging: isMutating,
    changeJobOperationStatus: trigger,
  };
}
