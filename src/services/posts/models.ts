import {
  CvStyle,
  CvType,
  EnumKeys,
  JobLevel,
  PaymentMethod,
  PostStatus,
  ServiceTypes,
} from "@/commons/enum";
import dayjs from "dayjs";
import { AccountModel } from "../accounts/models";
import { MajorCode } from "../majors/models";
import { TransactionModel } from "../transactions/models";

export type PostModel = {
  id: number;
  title: string;
  status: EnumKeys<typeof PostStatus>;
  majorId: number;
  jobPosition: string;
  jobLevel: EnumKeys<typeof JobLevel>;
  serviceType: EnumKeys<typeof ServiceTypes>;
  finishTime?: dayjs.Dayjs;
  createdAt?: dayjs.Dayjs;
  updatedAt?: dayjs.Dayjs;
  content: string;
  supportCount: number;
  mediaUrl: string;
  cvStyle: EnumKeys<typeof CvStyle>;
  cvType: EnumKeys<typeof CvType>;
  description?: string;
  major: MajorCode;
  account?: AccountModel;
  freelancer?: AccountModel;
};

export type PostDetailModel = {
  id: number;
  title: string;
  status: EnumKeys<typeof PostStatus>;
  jobPosition: string;
  jobLevel: EnumKeys<typeof JobLevel>;
  serviceType: EnumKeys<typeof ServiceTypes>;
  finishTime: dayjs.Dayjs;
  content: string;
  supportCount?: number;
  mediaUrl: string;
  cvStyle: EnumKeys<typeof CvStyle>;
  cvType: EnumKeys<typeof CvType>;
  createdAt: dayjs.Dayjs;
  updatedAt: dayjs.Dayjs;
  description?: string;
  major: MajorCode;
  account?: AccountModel;
  freelancer?: AccountModel;
  transaction?: TransactionModel;
};

export type PostPaymentModel = {
  id: number;
  account: AccountModel;
  referenceTransactionId: string;
  amount: number;
  payMethod: EnumKeys<typeof PaymentMethod>;
  createdAt: dayjs.Dayjs;
  updatedAt: dayjs.Dayjs;
  postId: number;
  // status: EnumKeys<typeof PostStatus>;
};
