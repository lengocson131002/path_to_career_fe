import { EnumKeys, Roles } from "@/commons/enum";
import { MajorCode } from "../majors/models";

export type AccountModel = {
  id: number;
  email: string;
  phone: string;
  role: EnumKeys<typeof Roles>;
  name: string;
  description?: string;
  avatar: string;
  majors?: MajorCode[];
  score: number;
  isAccepted?: boolean;
};

export type AccountBriefModel = {
  id: number;
  email: string;
  phoneNumber: string;
  role: EnumKeys<typeof Roles>;
  fullName: string;
  avatar: string;
  description?: string;
  score: number;
};
