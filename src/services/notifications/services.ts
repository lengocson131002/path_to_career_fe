import { API_NOTIFICATION } from "@/commons/api";
import { PaginationModel } from "../core/models";
import { PaginationResponse } from "../core/responses";
import instance from "../instance";

import { mapNotificationModel } from "@/adapter/NotificationAdapter";
import { mapPage } from "@/adapter/PaginationAdapter";
import { NotificationModel } from "./models";
import { NotificationResponse } from "./responses";

export const getNotification = async ({
  pageSize,
  pageNumber,
}: {
  pageSize?: number;
  pageNumber?: number;
}): Promise<PaginationModel<NotificationModel>> => {
  const { data } = await instance.get<PaginationResponse<NotificationResponse>>(
    API_NOTIFICATION,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      params: {
        pageSize: pageSize ?? 10,
        pageNumber: pageNumber,
      },
    }
  );
  return mapPage(data, mapNotificationModel);
};
