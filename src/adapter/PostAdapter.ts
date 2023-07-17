import {
  PostDetailModel,
  PostModel,
  PostPaymentModel,
} from "@/services/posts/models";
import {
  PostDetailResponse,
  PostPaymentResponse,
  PostResponse,
} from "@/services/posts/responses";
import dayjs from "dayjs";
import { mapAccountModel } from "./AccountAdapter";
import { mapTransactionModel } from "./TransactionAdapter";
import { MessageModel } from "@/services/message/models";
import { MessageResponse } from "@/services/message/responses";

export const mapPostPaymentModel = (
  res: PostPaymentResponse
): PostPaymentModel => {
  return {
    id: res.id,
    account: mapAccountModel(res.account),
    amount: res.amount,
    createdAt: dayjs(res.createdAt),
    payMethod: res.payMethod,
    postId: res.postId,
    referenceTransactionId: res.referenceTransactionId,
    updatedAt: dayjs(res.updatedAt),
    content: res.content,
  };
};

export const mapPostModel = (res: PostResponse): PostModel => {
  return {
    content: res.content,
    cvStyle: res.cvStyle,
    cvType: res.cvType,
    finishTime: res.finishTime ? dayjs(res.finishTime) : undefined,
    id: res.id,
    jobPosition: res.jobPosition,
    majorId: res.majorId,
    mediaUrl: res.mediaUrl,
    serviceType: res.serviceType,
    status: res.status,
    title: res.title,
    supportCount: res.supportCount,
    jobLevel: res.jobLevel,
    account: res.account ? mapAccountModel(res.account) : undefined,
    description: res.description,
    freelancer: res.freelancer ? mapAccountModel(res.freelancer) : undefined,
    major: res.major,
    createdAt: dayjs(res.createdAt),
    updatedAt: dayjs(res.createdAt),
  };
};

export const mapPostDetailModel = (
  res: PostDetailResponse
): PostDetailModel => {
  return {
    id: res.id,
    account: res.account ? mapAccountModel(res.account) : undefined,
    content: res.content,
    createdAt: dayjs(res.createdAt),
    cvStyle: res.cvStyle,
    cvType: res.cvType,
    description: res.description,
    finishTime: dayjs(res.finishTime),
    freelancer: res.freelancer ? mapAccountModel(res.freelancer) : undefined,
    jobLevel: res.jobLevel,
    jobPosition: res.jobPosition,
    major: res.major,
    mediaUrl: res.mediaUrl,
    serviceType: res.serviceType,
    status: res.status,
    supportCount: res.supportCount,
    title: res.title,
    transaction: res.transaction
      ? mapTransactionModel(res.transaction)
      : undefined,
    updatedAt: dayjs(res.updatedAt),
  };
};

export const mapPostMessageModel = (res: MessageResponse): MessageModel => {
  return {
    id: res.id,
    accountId: res.accountId,
    content: res.content,
    type: res.type,
    createdAt: dayjs(res.createdAt),
    updatedAt: res.updatedAt ? dayjs(res.updatedAt) : undefined,
  };
};
