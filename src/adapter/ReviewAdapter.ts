import dayjs from "dayjs";
import { mapAccountModel } from "./AccountAdapter";
import { ReviewResponse } from "@/services/reviews/responses";
import { ReviewModel } from "@/services/reviews/models";

export const mapReviewModel = (res: ReviewResponse): ReviewModel => {
  return {
    id: res.id,
    reviewer: res.account ? mapAccountModel(res.account) : undefined,
    account: res.account ? mapAccountModel(res.account) : undefined,
    score: res.score,
    content: res.content,
    createdAt: dayjs(res.createdAt),
    updatedAt: dayjs(res.createdAt),
  };
};
