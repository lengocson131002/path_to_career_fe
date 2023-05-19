import Background from "../../assets/auth-decor.png";
import Object from "../../assets/auth-decor-login.png";
import Logo from "../../assets/logo-only.png";
import Google from "../../assets/google-icon.png";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div className="login__container w-full flex overflow-y-hidden">
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
          <div className="login__main--logo max-w-[100px]">
            <Link to="/">
              <img className="object-contain max-w-[100px]" src={Logo} alt="" />
            </Link>
          </div>
          <div className="login__main--header uppercase text-2xl font-bold mt-3">
            Đăng nhập
          </div>
          <div className="login__main--form mt-1 max-w-[320px]">
            <Form layout="vertical">
              <label
                htmlFor="user_email"
                className="font-medium text-sm mb-1 block"
              >
                Email hoặc số điện thoại
              </label>
              <Form.Item name="userCre" noStyle>
                <Input
                  placeholder="Nhập email hoặc số điện thoại"
                  className="border-p2c-gray"
                />
              </Form.Item>
              <label
                htmlFor="user_email"
                className="font-medium text-sm mt-2 mb-1 block"
              >
                Mật khẩu
              </label>
              <Form.Item name="userPwd" noStyle>
                <Input.Password
                  placeholder="Nhập mật khẩu"
                  className="border-p2c-gray"
                />
              </Form.Item>
              <div className="login__main--action">
                <Form.Item noStyle>
                  <Button
                    type="primary"
                    className="bg-primary hover:!bg-primary hover:opacity-80 w-full h-[40px] mt-5 text-base font-semibold"
                  >
                    Đăng nhập
                  </Button>
                </Form.Item>
                <div className="divider flex justify-between items-center gap-x-2.5 my-2">
                  <div className="divider__line bg-p2c-gray h-[1px] w-full"></div>
                  <div className="divider__text font-bold text-base text-p2c-gray">
                    hoặc
                  </div>
                  <div className="divider__line bg-p2c-gray h-[1px] w-full"></div>
                </div>
                <Form.Item noStyle>
                  <Button
                    type="default"
                    className="group bg-white text-primary border-primary border-2 hover:!bg-primary hover:!text-white hover:!border-primary w-full h-[40px] text-base font-semibold"
                  >
                    <div className="flex justify-center items-center group-hover:brightness-0 group-hover:saturate-100 group-hover:invert group-hover:duration-100">
                      <div className="w-5 h-5 mr-4">
                        <img src={Google} alt="" className="w-full" />
                      </div>
                      <div className="">Đăng nhập với Google</div>
                    </div>
                  </Button>
                </Form.Item>
              </div>
            </Form>
            <div className="login__main--nav font-semibold mt-2">
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
