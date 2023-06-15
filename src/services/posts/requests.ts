import {
  CvStyle,
  CvType,
  EnumKeys,
  JobLevel,
  ServiceTypes,
} from "@/commons/enum";

export type CreatePostRequest = {
  title: string;
  jobPosition: string;
  jobLevel?: EnumKeys<typeof JobLevel>;
  serviceType?: EnumKeys<typeof ServiceTypes>;
  finishTime: string;
  content: string;
  supportCount?: number;
  mediaUrl?: string;
  cvStyle?: CvStyle;
  cvType?: CvType;
  majorCode: string;
  description?: string;
};
