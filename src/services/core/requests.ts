export type PaginationRequest = {
  pageNumber: number;
  pageSize: number;
  sortColumn: string;
  sortDir: "Asc" | "Desc";
};
