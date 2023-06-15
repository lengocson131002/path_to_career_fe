import { Roles, enumToList } from "@/commons/enum";
import { getMajorCodes } from "@/services/majors/services";
import { useQuery } from "@tanstack/react-query";
import { Button, Form, FormInstance, Input, Select, Tag } from "antd";
import Google from "../../assets/google-icon.png";
import { RegisterForm } from "./RegisterSteps";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";
import LoginGoogle from "../core/LoginGoogle";

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
              Tôi là
            </label>
          }
          rules={[{ required: true, message: "Vui lòng chọn vai trò." }]}
          initialValue={"User"}
        >
          <Select
            className="w-full"
            options={enumToList(Roles).filter((role) => role.value !== "Admin")}
            placeholder="Vai trò của bạn"
          />
        </Form.Item>

        <Form.Item
          name="description"
          label={<label className="font-medium block">Chức danh</label>}
        >
          <Input placeholder="Giới thiệu ngắn gọn" />
        </Form.Item>
        <Form.Item
          name="majorCodes"
          label={
            <label
              htmlFor="majorCodes"
              className="font-medium text-sm mt-2 mb-1 block"
            >
              Kỹ năng chính
            </label>
          }
          rules={[{ required: true, message: "Vui lòng chọn kỹ năng chính." }]}
        >
          <Select
            mode="tags"
            allowClear
            className="w-full"
            tagRender={({ label, closable, onClose }: CustomTagProps) => {
              return (
                <Tag
                  color={"green"}
                  closable={closable}
                  onClose={onClose}
                  style={{ marginRight: 3 }}
                >
                  {label}
                </Tag>
              );
            }}
            placeholder="Kỹ năng của bạn"
            options={data?.map((d) => ({
              label: d.name,
              value: d.code,
            }))}
          />
        </Form.Item>
        <Form.Item noStyle>
          <Button
            type="primary"
            className="w-full h-10 mt-2 text-base font-semibold"
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
          <LoginGoogle />
        </Form.Item>
      </Form>
    </>
  );
}

export default RegisterConfiguration;
