import {
  mapNotificationLink,
  mapNotificationModel,
} from "@/adapter/NotificationAdapter";
import { timeSince } from "@/commons/utils";
import { NotificationModel } from "@/services/notifications/models";
import { NotificationResponse } from "@/services/notifications/responses";
import { getNotification } from "@/services/notifications/services";
import { AppState } from "@/stores";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { useQuery } from "@tanstack/react-query";
import { Badge, Empty, List, Popover, notification } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

const NotificationDropdown = ({ children }: Props) => {
  const [connection, setConnection] = useState<HubConnection>();
  const { account } = useSelector((state: AppState) => state.user);
  const notifications = useQuery([`p2c_notification_${account.id}`], () =>
    getNotification({ pageSize: 5 })
  );
  const Context = React.createContext({ name: "Default" });
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    joinRoom(account.id);
    return () => {
      connection?.stop();
    };
  }, []);

  const openNotification = (notification: NotificationModel) => {
    api.info({
      message: notification.title,
      description: (
        <Context.Consumer>
          {() => (
            <Link
              to={mapNotificationLink({
                type: notification.type,
                refId: notification.referenceId,
              })}
            >
              {notification.content}
            </Link>
          )}
        </Context.Consumer>
      ),
      placement: "bottomRight",
    });
  };
  const contextValue = useMemo(() => ({ name: "Ant Design" }), []);

  const joinRoom = async (accountId: number) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl(import.meta.env.VITE_API_NOTIFICATION_URL)
        .build();

      connection.on("ReceiveNotification", (message: NotificationResponse) => {
        openNotification(mapNotificationModel(message));
        notifications.refetch();
      });

      connection.onclose((e) => {
        setConnection(undefined);
      });

      await connection.start();
      await connection.invoke("JoinRoom", { accountId });
      setConnection(connection);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {contextHolder}
      <Context.Provider value={contextValue}>
        <Popover
          align={{ offset: [0, 12] }}
          placement="bottomRight"
          content={
            notifications ? (
              <List
                className="w-96 p-0"
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
                header={<div className="text-lg font-bold px-4">Thông báo</div>}
                footer={
                  notifications.data?.hasNext ? (
                    <div className="text-center cursor-pointer text-primary">
                      <Link to={""}>Xem thêm</Link>
                    </div>
                  ) : (
                    <></>
                  )
                }
                renderItem={(item, index) => (
                  <Link
                    to={mapNotificationLink({
                      type: item.type,
                      refId: item.referenceId,
                      role: account.role,
                    })}
                  >
                    <List.Item
                      className="cursor-pointer hover:bg-gray-50"
                      style={{
                        paddingLeft: "12px",
                        paddingRight: "12px",
                      }}
                    >
                      <List.Item.Meta
                        title={
                          <div className="flex justify-between ">
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
                          <div className="flex justify-between ">
                            <div>{item.content}</div>
                            {!item.readAt && <Badge color="red" />}
                          </div>
                        }
                      />
                    </List.Item>
                  </Link>
                )}
              />
            ) : (
              <Empty
                image={Empty.PRESENTED_IMAGE_DEFAULT}
                imageStyle={{ height: 160, width: 384 }}
              ></Empty>
            )
          }
          arrow={false}
        >
          <div className="h-full flex items-center">
            <Badge count={notifications.data?.totalCount} size="small">
              {children}
            </Badge>
          </div>
        </Popover>
      </Context.Provider>
    </>
  );
};

export default NotificationDropdown;
