import useSWRMutation from 'swr/mutation';

const fetcher = (url: string, { arg }: { arg: { qty: number } }) =>
  fetch(url, {
    method: 'PUT',
    body: JSON.stringify({
      qty: arg.qty,
    }),
  }).then((res) => {
    if (!res.ok) {
      const error = new Error('An error occurred while fetching the data.');
      throw error;
    }
    return res.json();
  });

export function usePostJobOperationQty({ id }: { id: number }) {
  const { trigger, isMutating } = useSWRMutation(`/api/job-operations/${id}`, fetcher);

  return {
    isJobOperationQtyChanging: isMutating,
    changeJobOperationQty: trigger,
  };
}
