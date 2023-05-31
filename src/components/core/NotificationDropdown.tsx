import { Badge, Button, Empty, List, Popover, notification } from "antd";
import React, { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
// import { timeSince } from "../../utils/TimeUtils";

type Notification = {
  id: number;
  title: string;
  body: string;
  createdDate: Date;
  isRead: boolean;
};

type Props = {
  children: React.ReactNode;
};

const Context = React.createContext({ name: "Default" });

const NotificationDropdown = ({ children }: Props) => {
  return (
    <>
      <Popover
        align={{ offset: [0, 12] }}
        placement="bottomRight"
        content={
          <Empty
            image={Empty.PRESENTED_IMAGE_DEFAULT}
            imageStyle={{ height: 160, width: 384 }}
            description={<span>Bạn chưa có thông báo nào</span>}
          />
        }
        arrow={false}
      >
        <div className="h-full flex items-center">
          <Badge count={10} showZero size="small">
            {children}
          </Badge>
        </div>
      </Popover>
    </>
  );
};

export default NotificationDropdown;
