import * as S from './Pagination.styled';

interface PaginationProps {
  page: number;
  handleChange: VoidFunction;
}

export function Pagination({ page, handleChange }: PaginationProps) {
  return (
    <S.Pagination
      count={10}
      page={page}
      onChange={handleChange}
      variant="outlined"
      shape="rounded"
      renderItem={(item) => <S.PaginationItem {...item} />}
    />
  );
}
