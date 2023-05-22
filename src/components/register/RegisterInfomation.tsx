import { Button, Form, FormInstance, Input } from "antd";
import Google from "../../assets/google-icon.png";
import { RegisterForm } from "./RegisterSteps";

function RegisterInformation({
  form,
  onFinish,
}: {
  form: FormInstance;
  onFinish: (data: RegisterForm) => void;
}) {
  return (
    <>
      <Form
        form={form}
        layout="vertical"
        name="basic"
        autoComplete="off"
        onFinish={onFinish}
        validateTrigger="onBlur"
      >
        <Form.Item
          name="phone"
          rules={[
            { required: true, message: "Vui lòng nhập số điện thoại." },
            {
              pattern: /(0[3|5|7|8|9])+([0-9]{8})\b/,
              message: "Số điện thoại không đúng định dạng.",
            },
          ]}
          label={<label className="font-medium block">Số điện thoại</label>}
        >
          <Input placeholder="Số điện thoại của bạn" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập email." },
            {
              type: "email",
              message: "Email không đúng định dạng.",
            },
          ]}
          label={<label className="font-medium block">Email</label>}
        >
          <Input placeholder="Email của bạn" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu." },
            {
              pattern: /^.{8,}$/,
              message: "Mật khẩu phải ít nhất 8 ký tự.",
            },
          ]}
          label={<label className="font-medium block">Mật khẩu</label>}
        >
          <Input.Password placeholder="Mật khẩu của bạn" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label={<label className="font-medium block">Xác nhận mật khẩu</label>}
          rules={[
            { required: true, message: "Vui lòng nhập xác nhận mật khẩu." },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Xác nhận mật khẩu không trùng khớp.")
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Xác nhận mật khẩu của bạn" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            className="w-full h-10 mt-4 text-base font-semibold"
            htmlType="submit"
          >
            Tiếp tục
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
            className="group bg-white text-primary border-primary border-2 hover:!bg-primary hover:!text-white hover:!border-primary w-full h-10 text-base font-semibold"
          >
            <div className="flex justify-center items-center group-hover:brightness-0 group-hover:saturate-100 group-hover:invert group-hover:duration-100">
              <div className="w-5 h-5 mr-4">
                <img src={Google} alt="" className="w-full" />
              </div>
              <div className="">Đăng ký với Google</div>
            </div>
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default RegisterInformation;
