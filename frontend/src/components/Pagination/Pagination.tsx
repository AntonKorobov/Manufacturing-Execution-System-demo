import * as S from './Pagination.styled';

interface PaginationProps {
  count: number;
  page: number;
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

export function Pagination({ count, page, onChange: handleChange }: PaginationProps) {
  return (
    <S.Pagination
      count={count}
      page={page}
      onChange={handleChange}
      variant="outlined"
      shape="rounded"
      renderItem={(item) => <S.PaginationItem {...item} />}
    />
  );
}
