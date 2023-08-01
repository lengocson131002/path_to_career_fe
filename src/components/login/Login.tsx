import { getMe } from "@/services/accounts/services";
import { LoginRequest } from "@/services/auth/requests";
import { login } from "@/services/auth/services";
import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, message } from "antd";
import { useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginGoogle from "../core/LoginGoogle";
import { useDispatch } from "react-redux";
import { setUserState } from "@/stores/user.store";

export interface LoginForm {
  email: string;
  password: string;
}

function Login() {
  const mutation = useMutation((data: LoginRequest) => login(data));
  const navigate = useNavigate();
  const me = useMutation(() => getMe());
  const dispatch = useDispatch();

  const handleSubmit = useCallback((formData: LoginForm) => {
    const request: LoginRequest = {
      email: formData.email,
      password: formData.password,
    };
    mutation.mutate(request);
  }, []);

  useEffect(() => {
    if (mutation.isSuccess) {
      me.mutate();
    }
  }, [mutation.isSuccess]);

  useEffect(() => {
    if (me.isSuccess) {
      message.success("Đăng nhập thành công!");
      dispatch(
        setUserState({
          account: me.data,
        })
      );
      if (me.data.role === "User") {
        navigate("/");
      } else {
        navigate("/dashboard");
      }
    }
  }, [me.isSuccess]);

  return (
    <div className="login__main--form mt-1 max-w-[320px]">
      <Form
        layout="vertical"
        onFinish={handleSubmit}
        name="basic"
        autoComplete="off"
      >
        <Form.Item
          name="email"
          label={<label className="font-medium block">Email</label>}
          rules={[
            { required: true, message: "Vui lòng nhập email." },
            {
              type: "email",
              message: "Email không đúng định dạng.",
            },
          ]}
        >
          <Input placeholder="Nhập email" />
        </Form.Item>

        <Form.Item
          name="password"
          label={<label className="font-medium block">Mật khẩu</label>}
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu." },
            {
              pattern: /^.{8,}$/,
              message: "Mật khẩu phải ít nhất 8 ký tự.",
            },
          ]}
        >
          <Input.Password placeholder="Nhập mật khẩu" />
        </Form.Item>
        <Form.Item noStyle>
          <Button
            htmlType="submit"
            type="primary"
            className="hover:opacity-80 w-full mt-2 h-10 text-base font-semibold"
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
          <LoginGoogle />
        </Form.Item>
      </Form>
      <div className="login__main--nav font-semibold mt-5">
        Chưa có tài khoản?{" "}
        <Link to="/dang-ky" className="text-primary">
          Đăng ký
        </Link>{" "}
        ngay!
      </div>
    </div>
  );
}

export default Login;
