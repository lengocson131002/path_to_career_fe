import {
  CvStyle,
  CvType,
  EnumKeys,
  JobLevel,
  PostStatus,
  ServiceTypes,
} from "@/commons/enum";
import dayjs from "dayjs";
import { AccountBriefModel } from "../accounts/models";

export type PostModel = {
  id: number;
  title: string;
  accountId: number;
  acceptedAccountId: number;
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
};

export type PostDetailModel = {
  id: number;
  title: string;
  accountId: number;
  acceptedAccountId: number;
  status: EnumKeys<typeof PostStatus>;
  majorId: number;
  jobPosition: string;
  serviceType: EnumKeys<typeof ServiceTypes>;
  jobLevel: EnumKeys<typeof JobLevel>;
  finishTime?: dayjs.Dayjs;
  createdAt?: dayjs.Dayjs;
  updatedAt?: dayjs.Dayjs;
  content: string;
  supportCount: number;
  mediaUrl: string;
  cvStyle: EnumKeys<typeof CvStyle>;
  cvType: EnumKeys<typeof CvType>;
  major: {
    id: number;
    name: string;
    code: string;
  };
  account?: AccountBriefModel;
  acceptedAccount?: AccountBriefModel;
};
