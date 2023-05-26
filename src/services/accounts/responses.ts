import { MajorCodeResponse } from "../majors/responses";

export type AccountResponse = {
  id: number;
  email: string;
  phoneNumber: string;
  role: string;
  fullName: string;
  description: string;
  score: number;
  majors?: MajorCodeResponse[];
};