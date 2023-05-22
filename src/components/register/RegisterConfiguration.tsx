import { Roles, enumToList } from "@/commons/enum";
import { getMajorCodes } from "@/services/majors/services";
import { useQuery } from "@tanstack/react-query";
import { Button, Form, FormInstance, Input, Select } from "antd";
import { RegisterForm } from "./RegisterSteps";
import Google from "../../assets/google-icon.png";

function RegisterConfiguration({
  form,
  onFinish,
}: {
  form: FormInstance;
  onFinish: (data: RegisterForm) => void;
}) {
  const { data } = useQuery(["p2c_major_codes"], getMajorCodes);

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        validateTrigger={["onBlur, onChange"]}
        name="basic"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="name"
          label={<label className="font-medium block">Họ và tên</label>}
          rules={[{ required: true, message: "Vui lòng nhập họ và tên." }]}
        >
          <Input placeholder="Họ và tên của bạn" />
        </Form.Item>
        <Form.Item
          name="role"
          label={
            <label
              htmlFor="role"
              className="font-medium text-sm mt-2 mb-1 block"
            >
              Vai trò
            </label>
          }
          rules={[{ required: true, message: "Vui lòng chọn vai trò." }]}
          initialValue={"User"}
        >
          <Select
            className="w-full"
            options={enumToList(Roles)}
            placeholder="Vai trò của bạn"
          />
        </Form.Item>
        <Form.Item
          name="majorCodes"
          label={
            <label
              htmlFor="majorCodes"
              className="font-medium text-sm mt-2 mb-1 block"
            >
              Lĩnh vực
            </label>
          }
        >
          <Select
            mode="tags"
            allowClear
            className="w-full"
            placeholder="Lĩnh vực của bạn"
            options={data?.map((d) => ({
              label: d.name,
              value: d.code,
            }))}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            className="w-full h-10 mt-4 text-base font-semibold"
            htmlType="submit"
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

export default RegisterConfiguration;
