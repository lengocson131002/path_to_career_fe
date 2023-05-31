import { getMe } from "@/services/accounts/services";
import { useQuery } from "@tanstack/react-query";
import { Avatar, Badge, Button, Drawer, Dropdown } from "antd";
import { useEffect, useState } from "react";
import {
  AiOutlinePoweroff,
  BsFillBellFill,
  FaBars,
  FaHamburger,
  FaHome,
} from "react-icons/all";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "@/assets/logo.png";

type UserModel = {
  name: string;
};

function Header() {
  const [user, setUser] = useState<UserModel>();
  const [isFloat, setIsFloat] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
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

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

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
        </Link>
        <div className="float-right md:hidden">
          <FaBars size={24} className="text-primary" onClick={showDrawer} />
        </div>
        <div className="md:flex gap-8 items-center hidden">
          {user ? (
            <>
              <Link
                to={"/"}
                className="hover:text-primary cursor-pointer hover:font-semibold"
              >
                Trang chủ
              </Link>
              <Link
                to={"/"}
                className="hover:text-primary cursor-pointer hover:font-semibold"
              >
                Tìm việc làm
              </Link>
              <Link
                to={"/bai-dang/tao-bai-dang"}
                className="hover:text-primary cursor-pointer hover:font-semibold"
              >
                Đăng bài
              </Link>
              <Link
                to={"/bai-dang"}
                className="hover:text-primary cursor-pointer hover:font-semibold"
              >
                Quản lý bài đăng
              </Link>
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
              <Link
                to={"/"}
                className="hover:text-primary cursor-pointer hover:font-semibold"
              >
                Trang chủ
              </Link>
              <Link
                to={"/bai-dang"}
                className="hover:text-primary cursor-pointer hover:font-semibold"
              >
                Tìm việc làm
              </Link>

              <>
                <Link
                  to={"/dang-nhap"}
                  className="hover:text-primary cursor-pointer hover:font-semibold"
                >
                  Đăng nhập
                </Link>
                <Link
                  to={"/dang-ky"}
                  className="hover:text-primary cursor-pointer hover:font-semibold"
                >
                  Đăng ký
                </Link>
              </>
              <Button
                type="primary"
                className="text-white flex items-center px-6 py-5 rounded-3xl cursor-pointer"
              >
                <Link to={"/bai-dang/tao-bai-dang"}>Đăng bài</Link>
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
          <Link
            to={"/"}
            className="hover:text-primary cursor-pointer hover:font-semibold"
          >
            Trang chủ
          </Link>
          <Link
            to={"/bai-dang"}
            className="hover:text-primary cursor-pointer hover:font-semibold"
          >
            Tìm việc làm
          </Link>

          <>
            <Link
              to={"/dang-nhap"}
              className="hover:text-primary cursor-pointer hover:font-semibold"
            >
              Đăng nhập
            </Link>
            <Link
              to={"/dang-ky"}
              className="hover:text-primary cursor-pointer hover:font-semibold"
            >
              Đăng ký
            </Link>
          </>
          <Button
            type="primary"
            className="text-white flex items-center px-6 py-5 rounded-3xl cursor-pointer justify-center w-[160px]"
          >
            <Link to={"/bai-dang/tao-bai-dang"}>Đăng bài</Link>
          </Button>
        </div>
      </Drawer>
    </div>
  );
}

export default Header;
