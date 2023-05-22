import { MajorCode } from "../majors/models";

export type AccountModel = {
  id: number;
  email: string;
  phone: string;
  role: string;
  name: string;
  description: string;
  majors?: MajorCode[];
  score: number;
};
