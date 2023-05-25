import { API_REVIEW } from "@/commons/api";
import dayjs from "dayjs";
import instance from "../instance";
import { ReviewModel } from "./models";
import { SendReviewRequest } from "./requests";
import { ReviewResponse } from "./responses";
import { PaginationModel } from "../core/models";
import { PaginationResponse } from "../core/responses";

export const sendReview = async (
  request: SendReviewRequest
): Promise<ReviewModel> => {
  const { data, status } = await instance.post<ReviewResponse>(
    API_REVIEW,
    request,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }
  );
  if (status !== 200) {
    return Promise.reject();
  }
  return {
    id: data.id,
    account: data.account,
    reviewer: data.reviewer,
    content: data.content,
    score: data.score,
    createdAt: dayjs(data.createdAt),
    updatedAt: dayjs(data.updatedAt),
  };
};

export const getReviews = async (
  request?: SendReviewRequest
): Promise<PaginationModel<ReviewModel>> => {
  const { data } = await instance.get<PaginationResponse<ReviewResponse>>(
    API_REVIEW,
    {
      params: request,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }
  );
  return {
    hasNext: data.hasNext,
    hasPrevious: data.hasPrevious,
    pageNumber: data.pageNumber,
    pageSize: data.pageSize,
    totalCount: data.totalCount,
    totalPages: data.totalPages,
    items: data.items.map((item) => ({
      id: item.id,
      account: item.account,
      reviewer: item.reviewer,
      content: item.content,
      score: item.score,
      createdAt: dayjs(item.createdAt),
      updatedAt: dayjs(item.updatedAt),
    })),
  };
};
