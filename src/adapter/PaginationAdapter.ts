import { PaginationModel } from "@/services/core/models";
import { PaginationResponse } from "@/services/core/responses";

export function mapPage<TRes, TModel>(
  res: PaginationResponse<TRes>,
  mapper: (data: TRes) => TModel
): PaginationModel<TModel> {
  return {
    hasNext: res.hasNext,
    hasPrevious: res.hasPrevious,
    items: res.items.map((data) => mapper(data)),
    pageNumber: res.pageNumber,
    pageSize: res.pageSize,
    totalCount: res.totalCount,
    totalPages: res.totalPages,
  };
}
