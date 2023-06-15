import { EnumKeys, MessageType } from "@/commons/enum";
import dayjs from "dayjs";

export type MessageModel = {
  id: number;
  type: EnumKeys<typeof MessageType>;
  content: string;
  createdAt: dayjs.Dayjs;
  updatedAt?: dayjs.Dayjs;
  accountId: number;
};
