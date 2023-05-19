import Background from "@/assets/auth-decor.png";
import Object from "@/assets/auth-decor-login.png";
import Logo from "@/assets/logo-only.png";
import Google from "@/assets/google-icon.png";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div className="login__container w-full flex">
      <div className="login__decoration order-1 basis-1/2 relative h-screen">
        <div className="login__decoration--background h-full w-full">
          <img src={Background} alt="" className="h-full" />
        </div>
        <div className="login__decoration--object absolute w-2/3 h-1/2 top-0 translate-x-1/4 translate-y-1/3">
          <img src={Object} alt="" className="w-full" />
        </div>
      </div>
      <div className="login__main order-2 basis-1/2 h-screen flex items-center justify-center">
        <div className="login__main--content w-2/3">
          <div className="login__main--logo max-w-[120px]">
            <img src={Logo} alt="" />
          </div>
          <div className="login__main--header uppercase text-4xl font-bold mt-3">
            Đăng nhập
          </div>
          <div className="login__main--form mt-3 max-w-[400px]">
            <Form layout="vertical">
              <label htmlFor="user_email" className="font-medium mb-1 block">
                Email hoặc số điện thoại
              </label>
              <Form.Item name="userCre" noStyle>
                <Input
                  placeholder="Nhập email hoặc số điện thoại"
                  style={{ height: 40 }}
                  className="placeholder:font-medium border-p2c-gray"
                />
              </Form.Item>
              <label
                htmlFor="user_email"
                className="font-medium mt-3 mb-1 block"
              >
                Mật khẩu
              </label>
              <Form.Item name="userPwd" noStyle>
                <Input.Password
                  placeholder="Nhập mật khẩu"
                  style={{ height: 40 }}
                  className="placeholder:font-medium border-p2c-gray"
                />
              </Form.Item>
              <div className="login__main--action">
                <Form.Item noStyle>
                  <Button
                    type="primary"
                    className="bg-primary hover:!bg-primary hover:opacity-80 w-full h-[48px] mt-5 text-xl font-semibold"
                  >
                    Đăng nhập
                  </Button>
                </Form.Item>
                <div className="divider flex justify-between items-center gap-x-2.5 my-3">
                  <div className="divider__line bg-p2c-gray h-[1px] w-full"></div>
                  <div className="divider__text font-bold text-base text-p2c-gray">
                    hoặc
                  </div>
                  <div className="divider__line bg-p2c-gray h-[1px] w-full"></div>
                </div>
                <Form.Item noStyle>
                  <Button
                    type="default"
                    className="group bg-white text-primary border-primary border-2 hover:!bg-primary hover:!text-white hover:!border-primary w-full h-[48px] text-xl font-semibold"
                  >
                    <div className="flex justify-center group-hover:brightness-0 group-hover:saturate-100 group-hover:invert group-hover:duration-100">
                      <div className="w-7 h-7 mr-4">
                        <img src={Google} alt="" className="w-full" />
                      </div>
                      <div className="">Đăng nhập với Google</div>
                    </div>
                  </Button>
                </Form.Item>
              </div>
            </Form>
            <div className="login__main--nav font-semibold mt-3">
              Chưa có tài khoản?{" "}
              <Link to="/dang-ky" className="text-primary">
                Đăng ký
              </Link>{" "}
              ngay!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
