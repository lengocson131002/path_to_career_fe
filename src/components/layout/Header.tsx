import Logo from "@/assets/logo.png";
import { logout } from "@/services/auth/services";
import { AppState } from "@/stores";
import { Avatar, Button, Drawer, Dropdown } from "antd";
import { useEffect, useState } from "react";
import { AiOutlinePoweroff, BsFillBellFill, FaBars } from "react-icons/all";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NotificationDropdown from "../core/NotificationDropdown";

function Header() {
  const [isFloat, setIsFloat] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { account } = useSelector((state: AppState) => state.user);

  useEffect(() => {
    if (pathname === "/") {
      setIsFloat(true);
    } else {
      setIsFloat(false);
    }
  }, [pathname]);

  const handleLogout = () => {
    logout();
    navigate("/dang-nhap");
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const authenticatedHeader = [
    {
      url: "/",
      label: "Trang chủ",
    },
    {
      url: "/blog",
      label: "Blog",
    },
    {
      url: "/bai-dang/tao-bai-dang",
      label: "Đăng bài",
    },
    {
      url: "/bai-dang",
      label: "Quản lý bài đăng",
    },
  ];

  const unauthenticatedHeader = [
    {
      url: "/",
      label: "Trang chủ",
    },
    {
      url: "/blog",
      label: "Blog",
    },
    {
      url: "/dang-ky",
      label: "Đăng ký",
    },
  ];

  return (
    <div id="header">
      <div
        className={`md:h-20 h-16 shadow-p2c flex justify-between items-center md:px-28 px-5 fixed z-40 bg-white ${
          isFloat
            ? "md:rounded-full md:top-4 md:left-6 md:right-6 md:w-auto w-full"
            : "top-0 left-0 w-full"
        }`}
      >
        <div className="md:hidden block"></div>
        <Link to={"/"} className="h-full flex items-center">
          <img src={Logo} alt="p2c_logo" className="md:h-3/4 h-2/3" />
          SON UPDATE
        </Link>
        <div className="float-right md:hidden">
          <FaBars size={24} className="text-primary" onClick={showDrawer} />
        </div>
        <div className="md:flex gap-8 items-center h-10 hidden">
          {account ? (
            <>
              {authenticatedHeader.map(({ url, label }, index) => (
                <Link
                  key={index}
                  to={url}
                  className="hover:text-primary cursor-pointer font-semibold"
                >
                  {label}
                </Link>
              ))}
              <NotificationDropdown>
                <BsFillBellFill className="hover:text-primary cursor-pointer text-xl my-auto" />
              </NotificationDropdown>

              <Dropdown
                align={{ offset: [0, 12] }}
                menu={{
                  items: [
                    {
                      key: "1",
                      label: (
                        <div
                          className="flex items-center text-p2c-red gap-2"
                          onClick={handleLogout}
                        >
                          <AiOutlinePoweroff />
                          <div>Đăng xuất</div>
                        </div>
                      ),
                    },
                  ],
                }}
                placement="bottomRight"
              >
                <div className="flex gap-2 items-center cursor-pointer">
                  <div className="font-semibold max-w-[160px] text-ellipsis overflow-hidden whitespace-nowrap">
                    {account.name}
                  </div>
                  <Link to={"/ca-nhan"}>
                    <Avatar size="large" src={account.avatar}>
                      {account.email.charAt(0)?.toLocaleUpperCase()}
                    </Avatar>
                  </Link>
                </div>
              </Dropdown>
            </>
          ) : (
            <>
              {unauthenticatedHeader.map(({ url, label }, index) => (
                <Link
                  to={url}
                  key={index}
                  className="hover:text-primary cursor-pointer font-semibold"
                >
                  {label}
                </Link>
              ))}
              <Button
                type="primary"
                className="text-white font-semibold flex items-center px-6 py-5 rounded-3xl cursor-pointer"
              >
                <Link to={"/dang-nhap "}>Đăng nhập</Link>
              </Button>
            </>
          )}
        </div>
      </div>
      <Drawer
        placement="right"
        onClose={onClose}
        open={open}
        width={240}
        maskClosable
        closable={false}
        title={
          <>
            <div className="h-[36px] flex justify-center">
              <img src={Logo} alt="p2c_logo" />
            </div>
          </>
        }
      >
        <div className="flex flex-col gap-8 items-center">
          {account ? (
            <>
              {authenticatedHeader.map(({ url, label }, index) => (
                <Link
                  key={index}
                  to={url}
                  className="hover:text-primary cursor-pointer font-semibold"
                >
                  {label}
                </Link>
              ))}
              <NotificationDropdown>
                <BsFillBellFill className="hover:text-primary cursor-pointer text-xl my-auto" />
              </NotificationDropdown>

              <Dropdown
                align={{ offset: [0, 12] }}
                menu={{
                  items: [
                    {
                      key: "1",
                      label: (
                        <div
                          className="flex items-center text-p2c-red gap-2"
                          onClick={handleLogout}
                        >
                          <AiOutlinePoweroff />
                          <div>Đăng xuất</div>
                        </div>
                      ),
                    },
                  ],
                }}
                placement="bottomRight"
              >
                <div className="flex gap-2 items-center cursor-pointer">
                  <div className="font-semibold">{account.name}</div>
                  <Link to={"/ca-nhan"}>
                    <Avatar size="large" src={account.avatar}>
                      {"A"}
                    </Avatar>
                  </Link>
                </div>
              </Dropdown>
            </>
          ) : (
            <>
              {unauthenticatedHeader.map(({ url, label }, index) => (
                <Link
                  to={url}
                  key={index}
                  className="hover:text-primary cursor-pointer font-semibold"
                >
                  {label}
                </Link>
              ))}
              <Button
                type="primary"
                className="text-white font-semibold flex items-center px-6 py-5 rounded-3xl cursor-pointer"
              >
                <Link to={"/dang-nhap"}>Đăng nhập</Link>
              </Button>
            </>
          )}
        </div>
      </Drawer>
    </div>
  );
}

export default Header;
