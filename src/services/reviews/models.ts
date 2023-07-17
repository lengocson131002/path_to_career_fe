import dayjs from "dayjs";
import { AccountModel } from "../accounts/models";

export type ReviewModel = {
  id: number;
  reviewer?: AccountModel;
  account?: AccountModel;
  score: number;
  content: string;
  createdAt: dayjs.Dayjs;
  updatedAt: dayjs.Dayjs;
};
