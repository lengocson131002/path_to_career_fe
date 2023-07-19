import {
  TransactionDetailModel,
  TransactionModel,
} from "@/services/transactions/models";
import {
  TransactionDetailResponse,
  TransactionResponse,
} from "@/services/transactions/responses";
import dayjs from "dayjs";
import { mapAccountModel } from "./AccountAdapter";
import { mapPostModel } from "./PostAdapter";

export const mapTransactionModel = (
  res: TransactionResponse
): TransactionModel => {
  return {
    id: res.id,
    account: res.account ? mapAccountModel(res.account) : undefined,
    amount: res.amount,
    createdAt: dayjs(res.createdAt),
    payMethod: res.payMethod,
    postId: res.postId,
    referenceTransactionId: res.referenceTransactionId,
    status: res.status,
    updatedAt: dayjs(res.updatedAt),
  };
};

export const mapTransactionDetailModel = (
  res: TransactionDetailResponse
): TransactionDetailModel => {
  return {
    id: res.id,
    account: res.account ? mapAccountModel(res.account) : undefined,
    amount: res.amount,
    createdAt: dayjs(res.createdAt),
    payMethod: res.payMethod,
    post: res.post ? mapPostModel(res.post) : undefined,
    referenceTransactionId: res.referenceTransactionId,
    status: res.status,
    updatedAt: dayjs(res.updatedAt),
    content: res.content,
  };
};
