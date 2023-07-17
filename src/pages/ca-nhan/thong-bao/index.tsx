import { mapNotificationLink } from "@/adapter/NotificationAdapter";
import { timeSince } from "@/commons/utils";
import {
  getNotification,
  readNotification,
} from "@/services/notifications/services";
import { AppState } from "@/stores";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Badge, Card, Empty, List, Pagination } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Notification() {
  const { account } = useSelector((state: AppState) => state.user);
  const [page, setPage] = useState<number>(1);
  const notifications = useQuery([`p2c_notification_${account?.id}`], () =>
    getNotification({ pageNumber: page })
  );

  const readNotificationMutation = useMutation((id: number) =>
    readNotification(id)
  );

  useEffect(() => {
    notifications.refetch();
  }, [page]);

  useEffect(() => {
    if (readNotificationMutation.isSuccess) {
      notifications.refetch();
    }
  }, [readNotificationMutation.isSuccess]);

  return (
    <Card>
      {notifications ? (
        <>
          <List
            itemLayout="horizontal"
            locale={{
              emptyText: (
                <Empty
                  image={Empty.PRESENTED_IMAGE_DEFAULT}
                  imageStyle={{
                    height: 160,
                    width: 320,
                    margin: "0 auto",
                    marginBottom: 20,
                  }}
                  description={
                    <span className="text-xl font-medium text-sub-gray">
                      Bạn chưa có thông báo nào
                    </span>
                  }
                ></Empty>
              ),
            }}
            dataSource={notifications.data?.items}
            header={<div className="text-lg font-bold">Thông báo</div>}
            renderItem={(item, index) => (
              <Link
                to={mapNotificationLink({
                  type: item.type,
                  refId: item.referenceId,
                  role: account?.role,
                })}
                onClick={() => readNotificationMutation.mutate(item.id)}
              >
                <List.Item className="cursor-pointer hover:bg-gray-50">
                  <List.Item.Meta
                    className="px-4"
                    title={
                      <div className="flex justify-between">
                        <div
                          className={`font-bold ${
                            !item.readAt ? "text-primary" : "text-black"
                          }`}
                        >
                          {item.title}
                        </div>
                        <div className="font-medium text-base text-p2c-gray">
                          {timeSince(item.createdAt)}
                        </div>
                      </div>
                    }
                    description={
                      <div className="flex justify-between">
                        <div>{item.content}</div>
                        {!item.readAt && <Badge color="red" />}
                      </div>
                    }
                  />
                </List.Item>
              </Link>
            )}
          />
          <Pagination
            className="float-right mt-4"
            current={notifications.data?.pageNumber}
            total={notifications.data?.totalCount}
            onChange={(page) => setPage(page)}
          ></Pagination>
        </>
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_DEFAULT}
          imageStyle={{ height: 160, width: 384 }}
        ></Empty>
      )}
    </Card>
  );
}

export default Notification;
