import { EnumKeys, PaymentMethod, TransactionStatus } from "@/commons/enum";
import dayjs from "dayjs";
import { AccountModel } from "../accounts/models";
import { PostModel } from "../posts/models";

export type TransactionModel = {
  id: number;
  account?: AccountModel;
  referenceTransactionId: string;
  amount: number;
  payMethod: EnumKeys<typeof PaymentMethod>;
  createdAt: dayjs.Dayjs;
  updatedAt: dayjs.Dayjs;
  postId: number;
  status: EnumKeys<typeof TransactionStatus>;
};

export type TransactionDetailModel = {
  id: number;
  account?: AccountModel;
  referenceTransactionId: string;
  amount: number;
  payMethod: EnumKeys<typeof PaymentMethod>;
  createdAt: dayjs.Dayjs;
  updatedAt: dayjs.Dayjs;
  post?: PostModel;
  status: EnumKeys<typeof TransactionStatus>;
};
