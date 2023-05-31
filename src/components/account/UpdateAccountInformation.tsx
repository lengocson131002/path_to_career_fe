import { Roles, enumToList } from "@/commons/enum";
import { UpdateAccountRequest } from "@/services/accounts/requests";
import { getMe, updateAccount } from "@/services/accounts/services";
import { getMajorCodes } from "@/services/majors/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Avatar,
  Button,
  Form,
  Input,
  Select,
  Skeleton,
  Tag,
  Tooltip,
  Upload,
  message,
} from "antd";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";
import { useEffect, useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { RcFile } from "antd/es/upload";
import { upload } from "@/services/files/services";

interface UpdateAccountForm {
  email: string;
  role: string;
  name: string;
  phone: string;
  description: string;
  majorCodes: string[];
}

function UpdateAccountInformation() {
  const { data, isFetching } = useQuery(["p2c_me"], getMe);
  const majors = useQuery(["p2c_major_codes"], getMajorCodes);
  const { isSuccess, mutate } = useMutation((data: UpdateAccountRequest) =>
    updateAccount(data)
  );
  const [avatar, setAvatar] = useState<string | undefined>(data?.avatar);
  const queryClient = useQueryClient();
  const fileMutation = useMutation((file: RcFile) => upload(file));

  const onFinish = (formData: UpdateAccountForm) => {
    const request: UpdateAccountRequest = {
      description: formData.description,
      fullName: formData.name,
      majorCodes: formData.majorCodes,
      phoneNumber: formData.phone,
      avatar: avatar,
    };

    mutate(request);
  };

  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries(["p2c_me"]);
      message.success("Cập nhật thông tin thành công.");
    }
  }, [isSuccess]);

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("Ảnh đại diện chỉ hỗ trợ định dạng JPG/PNG!");
    }
    fileMutation.mutate(file);

    return false;
  };

  useEffect(() => {
    if (fileMutation.isSuccess) {
      setAvatar(fileMutation.data.url);
    }
  }, [fileMutation.isSuccess]);

  return (
    <Skeleton
      loading={!data || isFetching}
      active={!data || isFetching}
      paragraph={{ rows: 10 }}
    >
      <Form
        layout="vertical"
        name="basic"
        onFinish={onFinish}
        autoComplete="off"
        initialValues={{
          email: data?.email,
          phone: data?.phone,
          name: data?.name,
          role: data?.role,
          description: data?.description,
          majorCodes: data?.majors?.map((m) => m.code),
        }}
      >
        <Upload
          name="avatar"
          listType="picture"
          showUploadList={false}
          beforeUpload={beforeUpload}
        >
          <label className="font-medium block">Ảnh đại diện</label>
          <Tooltip title="Cập nhật ảnh đại diện" placement="bottom">
            {fileMutation.isLoading ? (
              <Skeleton.Avatar
                active={true}
                size={160}
                className="cursor-pointer hover:opacity-80 transition-all my-4"
              />
            ) : (
              <Avatar
                src={avatar ?? data?.avatar}
                alt="avatar"
                size={160}
                className="cursor-pointer hover:opacity-80 transition-all my-4"
              >
                {data?.email}
              </Avatar>
            )}
          </Tooltip>
        </Upload>

        <Form.Item
          name="email"
          label={<label className="font-medium block">Email</label>}
        >
          <Input placeholder="Email của bạn" disabled />
        </Form.Item>
        <Form.Item
          name="phone"
          rules={[
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
          name="name"
          label={<label className="font-medium block">Họ và tên</label>}
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
          initialValue={"User"}
        >
          <Select
            className="w-full"
            options={enumToList(Roles)}
            placeholder="Vai trò của bạn"
            disabled
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
            options={majors.data?.map((d) => ({
              label: d.name,
              value: d.code,
            }))}
          />
        </Form.Item>
        <Form.Item noStyle>
          <Button type="primary" htmlType="submit">
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </Skeleton>
  );
}

export default UpdateAccountInformation;
