import { Avatar, Badge, Button, Dropdown } from "antd";
import { useEffect, useState } from "react";
import { AiOutlinePoweroff, BsFillBellFill } from "react-icons/all";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";

type HeaderProps = {
  type?: "default" | "float" | "authenticated";
};
type UserModel = {
  name: string;
};

function Header({ type }: HeaderProps) {
  const [user, setUser] = useState<UserModel>();

  useEffect(() => {
    if (type === "authenticated") {
      setUser({
        name: "Nguyễn Văn A",
      });
    }
  }, []);

  return (
    <div id="header">
      <div className="w-full h-20 top-0 left-0 shadow-p2c flex justify-between items-center px-28 fixed z-50 bg-white">
        <img src={Logo} alt="p2c_logo" className="h-3/4" />
        <div className="flex gap-8 items-center">
          {type === "authenticated" ? (
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
                to={"/"}
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
                        <div className="flex items-center text-p2c-red gap-2">
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
                  <div className="font-semibold">{user?.name}</div>
                  <Link to={"/"}>
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
    </div>
  );
}

export default Header;
