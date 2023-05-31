import {
  CvStyle,
  CvType,
  EnumKeys,
  JobLevel,
  PostStatus,
  ServiceTypes,
} from "@/commons/enum";
import dayjs from "dayjs";
import { AccountBriefResponse } from "../accounts/responses";

export type CreatePostResponse = {
  id: number;
  title: string;
  accountId: number;
  acceptedAccountId: number;
  status: EnumKeys<typeof PostStatus>;
  majorId: number;
  jobPosition: string;
  jobLevel: EnumKeys<typeof JobLevel>;
  serviceType: EnumKeys<typeof ServiceTypes>;
  finishTime: string;
  content: string;
  supportCount: number;
  mediaUrl: string;
  cvStyle: EnumKeys<typeof CvStyle>;
  cvType: EnumKeys<typeof CvType>;
};

export type PostResponse = {
  id: number;
  title: string;
  accountId: number;
  acceptedAccountId: number;
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
};

export type PostDetailResponse = {
  id: number;
  title: string;
  accountId: number;
  acceptedAccountId: number;
  status: EnumKeys<typeof PostStatus>;
  majorId: number;
  jobPosition: string;
  serviceType: EnumKeys<typeof ServiceTypes>;
  jobLevel: EnumKeys<typeof JobLevel>;
  finishTime?: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
  supportCount: number;
  mediaUrl: string;
  cvStyle: EnumKeys<typeof CvStyle>;
  cvType: EnumKeys<typeof CvType>;
  major: {
    id: number;
    name: string;
    code: string;
  };
  account?: AccountBriefResponse;
  acceptedAccount?: AccountBriefResponse;
};
