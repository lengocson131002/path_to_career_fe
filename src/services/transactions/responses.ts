import { EnumKeys, PaymentMethod, TransactionStatus } from "@/commons/enum";
import { AccountResponse } from "../accounts/responses";
import { PostResponse } from "../posts/responses";

export type TransactionResponse = {
  id: number;
  account?: AccountResponse;
  referenceTransactionId: string;
  amount: number;
  payMethod: EnumKeys<typeof PaymentMethod>;
  createdAt: string;
  updatedAt: string;
  postId: number;
  status: EnumKeys<typeof TransactionStatus>;
};

export type TransactionDetailResponse = {
  id: number;
  account?: AccountResponse;
  referenceTransactionId: string;
  amount: number;
  payMethod: EnumKeys<typeof PaymentMethod>;
  createdAt: string;
  updatedAt: string;
  content: string;
  post?: PostResponse;
  status: EnumKeys<typeof TransactionStatus>;
};
