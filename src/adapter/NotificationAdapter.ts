import {
  EnumKeys,
  NotificationContent,
  NotificationTitle,
  NotificationType,
  Roles,
} from "@/commons/enum";
import { NotificationModel } from "@/services/notifications/models";
import { NotificationResponse } from "@/services/notifications/responses";
import dayjs from "dayjs";

export const mapNotificationModel = (
  res: NotificationResponse
): NotificationModel => {
  return {
    id: res.id,
    accountId: res.accountId,
    content: NotificationContent[res.type],
    data: res.data,
    referenceId: res.referenceId,
    type: res.type,
    title: NotificationTitle[res.type],
    readAt: res.readAt ? dayjs(res.readAt) : undefined,
    updatedAt: res.createdAt ? dayjs(res.updatedAt) : undefined,
    createdAt: dayjs(res.createdAt),
    deletedAt: res.createdAt ? dayjs(res.deletedAt) : undefined,
  };
};

export const mapNotificationLink = ({
  type,
  refId,
  role,
}: {
  type: EnumKeys<typeof NotificationType>;
  refId: string;
  role?: EnumKeys<typeof Roles>;
}) => {
  switch (type) {
    case "FreelancerAccepted": {
      return "/";
    }
    case "FreelancerCreated": {
      return `/dashboard/freelancers`;
    }
    case "MessageCreated": {
      return role === "User" ? `/bai-dang/${refId}/lien-he` : `/dashboard/posts/${refId}/messages` ;
    }
    case "PostCreated": {
      return `/dashboard/posts/${refId}`;
    }
    case "TransactionCanceled": {
      return `/bai-dang/${refId}`;
    }
    case "TransactionConfirmed": {
      return `/bai-dang/${refId}`;
    }
    case "TransactionCreated": {
      return `/dashboard/transactions/${refId}`;
    }
    default: {
      return "";
    }
  }
};
