import { EnumKeys, NotificationType } from "@/commons/enum";

export type NotificationResponse = {
  id: number;
  type: EnumKeys<typeof NotificationType>;
  content: string;
  data: string;
  accountId: number;
  readAt?: string;
  referenceId: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
};
