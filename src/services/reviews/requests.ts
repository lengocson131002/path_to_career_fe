export type SendReviewRequest = {
  accountId?: number;
  score?: number;
  content?: string;
};

export type GetReviewsRequest = {
  reviewId?: number;
  accountId?: number;
  query?: number;
};
