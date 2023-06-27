import {
  mapNotificationLink,
  mapNotificationModel,
} from "@/adapter/NotificationAdapter";
import Logo from "@/assets/logo.png";
import { logout } from "@/services/auth/services";
import { NotificationModel } from "@/services/notifications/models";
import { NotificationResponse } from "@/services/notifications/responses";
import { AppState } from "@/stores";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { Avatar, Breadcrumb, Layout, Menu, notification } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { AiOutlineTransaction } from "react-icons/ai";
import {
  FaUserEdit,
  FaUserGraduate,
  FaUserTie,
  FaWpforms,
} from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

const { Content, Sider } = Layout;

function DashboardLayout({ children }: { children: JSX.Element }) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").slice(2);
  const { account } = useSelector((state: AppState) => state.user);
  const [connection, setConnection] = useState<HubConnection>();
  const Context = React.createContext({ name: "Default" });
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (account) {
      joinRoom(account.id);
    }
    return () => {
      connection?.stop();
    };
  }, []);
  const joinRoom = async (accountId: number) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl(import.meta.env.VITE_API_NOTIFICATION_URL)
        .build();

      connection.on("ReceiveNotification", (message: NotificationResponse) => {
        openNotification(mapNotificationModel(message));
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
                role: account?.role,
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

  const menuAdmin = [
    {
      key: "dashboards",
      icon: <RxDashboard />,
      label: "Dashboard",
      onClick: () => navigate("/dashboard"),
    },
    {
      key: "posts",
      icon: <FaWpforms />,
      label: "Bài đăng",
      onClick: () => navigate("/dashboard/posts"),
    },
    {
      key: "accounts",
      icon: <FaUserGraduate />,
      label: "Tài khoản",
      onClick: () => navigate("/dashboard/accounts"),
    },
    {
      key: "freelancers",
      icon: <FaUserTie />,
      label: "Freelancer",
      onClick: () => navigate("/dashboard/freelancers"),
    },
    {
      key: "transactions",
      icon: <AiOutlineTransaction />,
      label: "Giao dịch",
      onClick: () => navigate("/dashboard/transactions"),
    },
    {
      key: "transactions",
      icon: <Avatar src={account?.avatar} size={"small"} />,
      label: account?.name,
      children: [
        {
          key: "information",
          icon: <FaUserEdit />,
          label: "Thông tin",
          onClick: () => navigate("/dashboard/information"),
        },
        {
          key: "notifications",
          icon: <IoMdNotifications />,
          label: "Thông báo",
          onClick: () => navigate("/dashboard/notifications"),
        },
        {
          key: "logout",
          icon: <MdLogout />,
          label: "Đăng xuất",
          danger: true,
          onClick: () => {
            logout();
            navigate("/dang-nhap");
          },
        },
      ],
    },
  ];

  const menuFreelancer = [
    {
      key: "dashboards",
      icon: <RxDashboard />,
      label: "Dashboard",
      onClick: () => navigate("/dashboard"),
    },
    {
      key: "posts",
      icon: <FaWpforms />,
      label: "Bài đăng",
      onClick: () => navigate("/dashboard/posts"),
    },
    {
      key: "transactions",
      icon: <Avatar src={account?.avatar} size={"small"} />,
      label: account?.name,
      children: [
        {
          key: "information",
          icon: <FaUserEdit />,
          label: "Thông tin",
          onClick: () => navigate("/dashboard/information"),
        },
        {
          key: "notifications",
          icon: <IoMdNotifications />,
          label: "Thông báo",
          onClick: () => navigate("/dashboard/notifications"),
        },
        {
          key: "logout",
          icon: <MdLogout />,
          label: "Đăng xuất",
          danger: true,
          onClick: () => {
            logout();
            navigate("/dang-nhap");
          },
        },
      ],
    },
  ];
  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          theme="light"
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <div className="w-full flex justify-center my-6">
            <img src={Logo} alt="p2c_logo" className="w-2/4" />
          </div>

          <Menu
            defaultSelectedKeys={[
              !isNaN(+pathSnippets[pathSnippets.length - 1])
                ? pathSnippets[pathSnippets.length - 2]
                : pathSnippets[pathSnippets.length - 1],
            ]}
            mode="inline"
            items={(() => {
              switch (account?.role) {
                case "Admin":
                  return menuAdmin;
                case "Freelancer":
                  return menuFreelancer;
              }
            })()}
          />
        </Sider>
        <Layout
          className={`transition-all ${collapsed ? "ml-[80px]" : "ml-[200px]"}`}
        >
          <Content className="m-6">
            <Breadcrumb className="mb-4 cursor-pointer">
              <Breadcrumb.Item key={0} onClick={() => navigate("/dashboard")}>
                Dashboard
              </Breadcrumb.Item>
              {pathSnippets.map((path, index) => (
                <Breadcrumb.Item
                  key={index + 1}
                  className="capitalize"
                  onClick={() =>
                    navigate(
                      `/dashboard/${pathSnippets.slice(0, index + 1).join("/")}`
                    )
                  }
                >
                  {path}
                </Breadcrumb.Item>
              ))}
            </Breadcrumb>
            {children}
          </Content>
        </Layout>
      </Layout>
    </Context.Provider>
  );
}

export default DashboardLayout;
