import { EnumKeys, Roles, getEnumKeyByValue } from "@/commons/enum";
import { AccountRequest } from "@/services/accounts/requests";
import { register } from "@/services/accounts/services";
import { useMutation } from "@tanstack/react-query";
import { Form, Steps, message } from "antd";
import { useCallback, useEffect, useState } from "react";
import { AiFillInfoCircle, AiTwotoneSetting } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import RegisterConfiguration from "./RegisterConfiguration";
import RegisterInformation from "./RegisterInfomation";

export interface RegisterForm {
  phone?: string;
  email?: string;
  name?: string;
  password?: string;
  description?: string;
  role?: EnumKeys<typeof Roles>;
  majorCodes?: string[];
}

function RegisterSteps() {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const mutation = useMutation((data: AccountRequest) => register(data));
  const [data, setData] = useState<RegisterForm>({});
  const navigate = useNavigate();

  const handleNextStep = useCallback(
    (formData: RegisterForm) => {
      setData((prev) => ({
        ...prev,
        ...formData,
      }));
      setCurrent(current + 1);
    },
    [current]
  );

  const handleSubmit = useCallback(
    (formData: RegisterForm) => {
      setData((prev) => ({
        ...prev,
        ...formData,
      }));
      const request: AccountRequest = {
        email: data.email ?? "",
        password: data.password ?? "",
        phoneNumber: data.phone ?? "",
        fullName: formData.name ?? "",
        role: formData.role ?? getEnumKeyByValue(Roles, Roles.User),
        majorCodes: formData.majorCodes,
        description: formData.description,
      };
      mutation.mutate(request);
    },
    [data, current]
  );

  useEffect(() => {
    if (mutation.isSuccess) {
      message.success("Đăng ký tài khoản thành công");
      navigate("/dang-nhap");
    }
  }, [mutation.isSuccess]);

  const steps = [
    {
      title: <div className="cursor-pointer">Thông tin cá nhân</div>,
      content: <RegisterInformation form={form} onFinish={handleNextStep} />,
      icon: <AiFillInfoCircle className="text-xl" />,
    },
    {
      title: <div className="cursor-pointer">Hồ sơ làm việc</div>,
      content: <RegisterConfiguration form={form} onFinish={handleSubmit} />,
      icon: <AiTwotoneSetting className="text-xl" />,
    },
  ];

  return (
    <div className="register__main--form mt-1 w-[320px]">
      <Steps
        current={current}
        items={steps.map((step, index) => ({
          onClick: () => {
            if (current !== steps.length - 1) {
              form.submit();
            } else setCurrent(index);
          },
          title: step.title,
          key: step.title,
          icon: step.icon,
        }))}
        size="small"
        className="my-6"
      />

      <div>{steps[current].content}</div>

      <div className="register__main--nav font-semibold mt-2">
        Đã có tài khoản?{" "}
        <Link to="/dang-nhap" className="text-primary">
          Đăng nhập
        </Link>{" "}
        ngay!
      </div>
    </div>
  );
}

export default RegisterSteps;
