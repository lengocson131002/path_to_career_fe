import Background from "../../assets/auth-decor.png";
import Object from "../../assets/auth-decor-register.png";
import Logo from "../../assets/logo-only.png";
import Google from "../../assets/google-icon.png";
import { Button, Checkbox, Form, Input } from "antd";
import { Link } from "react-router-dom";

function RegisterPage() {
  return (
    <div className="register__container w-full flex overflow-y-hidden">
      <div className="register__decoration order-2 basis-1/2 relative h-screen">
        <div className="register__decoration--background h-full w-full rotate-180 -scale-y-100">
          <img src={Background} alt="" className="h-full" />
        </div>
        <div className="register__decoration--object absolute w-9/12 h-1/2 top-0 translate-x-[20%] translate-y-1/4">
          <img src={Object} alt="" className="w-full" />
        </div>
      </div>
      <div className="register__main order-1 basis-1/2 h-screen flex items-center justify-center">
        <div className="register__main--content 3/5 pl-10">
          <div className="register__main--logo max-w-[100px]">
            <Link to="/">
              <img className="object-contain max-w-[100px]" src={Logo} alt="" />
            </Link>
          </div>
          <div className="register__main--header uppercase text-2xl font-bold mt-3">
            Đăng ký
          </div>
          <div className="register__main--form mt-1 max-w-[320px]">
            <Form layout="vertical">
              <label
                htmlFor="user_phone"
                className="font-medium text-sm mb-1 block"
              >
                Số điện thoại
              </label>
              <Form.Item name="userPhone" noStyle>
                <Input
                  placeholder="Số điện thoại của bạn"
                  className="border-p2c-gray"
                />
              </Form.Item>
              <label
                htmlFor="user_email"
                className="font-medium text-sm  mt-2 mb-1 block"
              >
                Email
              </label>
              <Form.Item name="userEmail" noStyle>
                <Input
                  placeholder="Email của bạn"
                  className="border-p2c-gray"
                />
              </Form.Item>
              <label
                htmlFor="user_name"
                className="font-medium text-sm  mt-2 mb-1 block"
              >
                Họ và tên
              </label>
              <Form.Item name="userName" noStyle>
                <Input
                  placeholder="Họ và tên của bạn"
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
                  placeholder="Mật khẩu của bạn"
                  className="border-p2c-gray"
                />
              </Form.Item>
              <label
                htmlFor="user_email"
                className="font-medium text-sm mt-2 mb-1 block"
              >
                Xác nhận mật khẩu
              </label>
              <Form.Item name="userPwd" noStyle>
                <Input.Password
                  placeholder="Xác nhận mật khẩu của bạn"
                  className="border-p2c-gray"
                />
              </Form.Item>
              <Form.Item noStyle>
                <Checkbox className="mt-6 font-medium">
                  Tôi đã đọc, đồng ý với{" "}
                  <span className="text-primary">
                    Điều khoản, điều kiện sử dụng ứng dụng và mở tài khoản.
                  </span>
                </Checkbox>
              </Form.Item>
              <div className="register__main--action">
                <Form.Item noStyle>
                  <Button
                    type="primary"
                    className="bg-primary hover:!bg-primary hover:opacity-80 w-full h-[40px] mt-2 text-base font-semibold"
                  >
                    Đăng ký
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
                      <div className="">Đăng ký với Google</div>
                    </div>
                  </Button>
                </Form.Item>
              </div>
            </Form>
            <div className="register__main--nav font-semibold mt-2">
              Đã có tài khoản?{" "}
              <Link to="/dang-nhap" className="text-primary">
                Đăng nhập
              </Link>{" "}
              ngay!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
