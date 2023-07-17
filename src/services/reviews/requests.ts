export type SendReviewRequest = {
  postId?: number;
  score?: number;
  content?: string;
};

export type GetReviewsRequest = {
  reviewerId?: number;
  accountId?: number;
  query?: number;
  page?: number;
};
