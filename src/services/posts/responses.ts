import {
  CvStyle,
  CvType,
  EnumKeys,
  JobLevel,
  PaymentMethod,
  PostStatus,
  ServiceTypes,
} from "@/commons/enum";
import { AccountResponse } from "../accounts/responses";
import { MajorCode } from "../majors/models";
import { TransactionResponse } from "../transactions/responses";
import { ReviewResponse } from "../reviews/responses";

export type PostResponse = {
  id: number;
  title: string;
  status: EnumKeys<typeof PostStatus>;
  majorId: number;
  jobPosition: string;
  jobLevel: EnumKeys<typeof JobLevel>;
  serviceType: EnumKeys<typeof ServiceTypes>;
  finishTime?: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
  supportCount: number;
  mediaUrl: string;
  cvStyle: EnumKeys<typeof CvStyle>;
  cvType: EnumKeys<typeof CvType>;
  description?: string;
  major: MajorCode;
  account?: AccountResponse;
  freelancer?: AccountResponse;
};

export type PostDetailResponse = {
  id: number;
  title: string;
  status: EnumKeys<typeof PostStatus>;
  jobPosition: string;
  jobLevel: EnumKeys<typeof JobLevel>;
  serviceType: EnumKeys<typeof ServiceTypes>;
  finishTime: string;
  content: string;
  supportCount?: number;
  mediaUrl: string;
  cvStyle: EnumKeys<typeof CvStyle>;
  cvType: EnumKeys<typeof CvType>;
  createdAt: string;
  updatedAt: string;
  description?: string;
  major: MajorCode;
  account?: AccountResponse;
  freelancer?: AccountResponse;
  transaction?: TransactionResponse;
  review?: ReviewResponse;
};

export type PostPaymentResponse = {
  id: number;
  account: AccountResponse;
  referenceTransactionId: string;
  amount: number;
  payMethod: EnumKeys<typeof PaymentMethod>;
  createdAt: string;
  updatedAt: string;
  content: string;
  postId: number;
  // status: EnumKeys<typeof PostStatus>;
};
