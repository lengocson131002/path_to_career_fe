export type PaginationModel<T> = {
  pageNumber: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
  hasPrevious: boolean;
  hasNext: boolean;
  items: Array<T>;
};
