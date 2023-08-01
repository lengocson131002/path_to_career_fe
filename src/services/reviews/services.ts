import { mapReviewModel } from "@/adapter/ReviewAdapter";
import { API_REVIEW, API_REVIEW_DETAIL } from "@/commons/api";
import { PaginationModel } from "../core/models";
import { PaginationResponse } from "../core/responses";
import instance from "../instance";
import { ReviewModel } from "./models";
import { GetReviewsRequest, SendReviewRequest } from "./requests";
import { ReviewResponse } from "./responses";

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
  return mapReviewModel(data);
};

export const getReviews = async (
  request?: GetReviewsRequest
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
    items: data.items.map((item) => mapReviewModel(item)),
  };
};

export const getReview = async (id: number): Promise<ReviewModel> => {
  const { data } = await instance.get<ReviewResponse>(
    API_REVIEW_DETAIL.replace("{id}", id.toString()),
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }
  );
  return mapReviewModel(data);
};

export const updateReview = async ({
  id,
  request,
}: {
  id: number;
  request: Pick<SendReviewRequest, "content" | "score">;
}): Promise<ReviewModel> => {
  const { data } = await instance.put<ReviewResponse>(
    API_REVIEW_DETAIL.replace("{id}", id.toString()),
    request,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }
  );
  return mapReviewModel(data);
};
