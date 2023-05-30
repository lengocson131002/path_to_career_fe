import { EnumKeys, Roles } from "@/commons/enum";
import { MajorCode } from "../majors/models";

export type AccountModel = {
  id: number;
  email: string;
  phone: string;
  role: string;
  name: string;
  description: string;
  avatar: string;
  majors?: MajorCode[];
  score: number;
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
