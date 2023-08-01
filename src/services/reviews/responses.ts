import { AccountResponse } from "../accounts/responses";

export type ReviewResponse = {
  id: number;
  reviewer?: AccountResponse;
  account?: AccountResponse;
  score: number;
  content: string;
  createdAt: string;
  updatedAt: string;
};
