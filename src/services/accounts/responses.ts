import { EnumKeys, Roles } from "@/commons/enum";
import { MajorCodeResponse } from "../majors/responses";

export type AccountResponse = {
  id: number;
  email: string;
  phoneNumber: string;
  role: EnumKeys<typeof Roles>;
  fullName: string;
  description?: string;
  score: number;
  avatar: string;
  isAccepted?: boolean;
  majors?: MajorCodeResponse[];
};

export type AccountBriefResponse = {
  id: number;
  email: string;
  phoneNumber: string;
  role: EnumKeys<typeof Roles>;
  avatar: string;
  fullName: string;
  description?: string;
  score: number;
};
