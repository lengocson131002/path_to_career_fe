import { getMe } from "@/services/accounts/services";
import { useQuery } from "@tanstack/react-query";
import { Avatar, Badge, Button, Dropdown } from "antd";
import { useEffect, useState } from "react";
import { AiOutlinePoweroff, BsFillBellFill } from "react-icons/all";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "@/assets/logo.png";

type UserModel = {
  name: string;
};

function Header() {
  const [user, setUser] = useState<UserModel>();
  const [isFloat, setIsFloat] = useState<boolean>(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { data } = useQuery(["p2c_me"], getMe);

  useEffect(() => {
    if (data) {
      setUser({
        name: data?.name,
      });
    }
  }, [data]);

  useEffect(() => {
    if (pathname === "/") {
      setIsFloat(true);
    } else {
      setIsFloat(false);
    }
  }, [pathname]);

  const handleLogout = () => {
    navigate("/dang-nhap");
  };

  const authenticatedHeader = [
    {
      url: "/",
      label: "Trang chủ",
    },
    {
      url: "/",
      label: "Tìm việc làm",
    },
    {
      url: "/",
      label: "Đăng bài",
    },
    {
      url: "/",
      label: "Quản lý bài đăng",
    },
  ];

  const unauthenticatedHeader = [
    {
      url: "/",
      label: "Trang chủ",
    },
    {
      url: "/bai-dang",
      label: "Tìm việc làm",
    },
    {
      url: "/dang-nhap",
      label: "Đăng nhập",
    },
    {
      url: "/dang-ky",
      label: "Đăng ký",
    },
  ];
  return (
    <div id="header">
      <div
        className={`h-20 shadow-p2c flex justify-between items-center px-28 fixed z-40 bg-white ${
          isFloat ? "rounded-full top-4 left-6 right-6" : "top-0 left-0 w-full"
        }`}
      >
        <Link to={"/"} className="h-full flex items-center">
          <img src={Logo} alt="p2c_logo" className="h-3/4" />
        </Link>

        <div className="flex gap-8 items-center">
          {user ? (
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
              <Badge count={10} showZero size="small">
                <BsFillBellFill className="hover:text-primary cursor-pointer text-xl" />
              </Badge>

              <Dropdown
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
                  <div className="font-semibold">{user.name}</div>
                  <Link to={"/ca-nhan"}>
                    <Avatar size="large">{"A"}</Avatar>
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
                <Link to={"/bai-dang/tao-bai-dang"}>Đăng bài</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
