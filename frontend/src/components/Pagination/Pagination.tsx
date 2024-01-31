import * as S from './Pagination.styled';

export function Pagination({
  count,
  page,
  onChange,
}: {
  count: number;
  page: number;
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}) {
  return (
    <S.Pagination
      count={count}
      page={page}
      onChange={onChange}
      variant="outlined"
      shape="rounded"
      renderItem={(item) => <S.PaginationItem {...item} />}
    />
  );
}
