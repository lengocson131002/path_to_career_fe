import {
  EnumKeys,
  NotificationContent,
  NotificationTitle,
  NotificationType,
} from "@/commons/enum";
import dayjs from "dayjs";

export type NotificationModel = {
  id: number;
  type: EnumKeys<typeof NotificationType>;
  title: NotificationTitle;
  content: NotificationContent;
  data: string;
  accountId: number;
  readAt?: dayjs.Dayjs;
  referenceId: string;
  createdAt: dayjs.Dayjs;
  updatedAt?: dayjs.Dayjs;
  deletedAt?: dayjs.Dayjs;
};
