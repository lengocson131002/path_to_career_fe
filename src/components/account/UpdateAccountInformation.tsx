import { UpdateAccountRequest } from "@/services/accounts/requests";
import { getMe, updateAccount } from "@/services/accounts/services";
import { upload } from "@/services/files/services";
import { getMajorCodes } from "@/services/majors/services";
import store from "@/stores";
import { setUserState } from "@/stores/user.store";
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
import { RcFile } from "antd/es/upload";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";
import { useEffect, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";

interface UpdateAccountForm {
  email: string;
  role: string;
  name: string;
  phone: string;
  description: string;
  majorCodes: string[];
}

function UpdateAccountInformation() {
  const me = useQuery(["p2c_me"], getMe);

  const majors = useQuery(["p2c_major_codes"], getMajorCodes);
  const { isSuccess, mutate } = useMutation((data: UpdateAccountRequest) =>
    updateAccount(data)
  );
  const [avatar, setAvatar] = useState<string | undefined>(me.data?.avatar);
  const queryClient = useQueryClient();
  const fileMutation = useMutation((file: RcFile) => upload(file));

  const onFinish = (formData: UpdateAccountForm) => {
    const request: UpdateAccountRequest = {
      description: formData.description,
      fullName: formData.name,
      majorCodes: formData.majorCodes,
      phoneNumber: formData.phone,
      avatar: avatar ?? me.data?.avatar,
    };
    mutate(request);
  };

  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries(["p2c_me"]);
      message.success("Cập nhật thông tin thành công.");
      me.refetch();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (me.isSuccess) {
      store.dispatch(
        setUserState({
          account: me.data,
        })
      );
    }
  }, [me.data]);

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("Ảnh đại diện chỉ hỗ trợ định dạng JPG/PNG!");
    } else {
      fileMutation.mutate(file);
    }

    return false;
  };

  useEffect(() => {
    if (fileMutation.isSuccess) {
      setAvatar(fileMutation.data.url);
    }
  }, [fileMutation.isSuccess]);

  return (
    <Skeleton
      loading={!me.data || me.isFetching}
      active={!me.data || me.isFetching}
      paragraph={{ rows: 10 }}
    >
      <Form
        layout="vertical"
        name="basic"
        onFinish={onFinish}
        autoComplete="off"
        initialValues={{
          email: me.data?.email,
          phone: me.data?.phone,
          name: me.data?.name,
          role: me.data?.role,
          description: me.data?.description,
          majorCodes: me.data?.majors?.map((m) => m.code),
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
                className="my-4"
              ></Skeleton.Avatar>
            ) : (
              <div className="relative">
                <Avatar
                  src={avatar ?? me.data?.avatar}
                  alt="avatar"
                  size={160}
                  className="cursor-pointer transition-all my-4"
                ></Avatar>
                <div className="absolute top-4 bg-gray-50 rounded-full cursor-pointer bottom-4 bg-opacity-50 right-0 left-0 flex flex-col py-4 items-center justify-center gap-2">
                  <AiOutlineCamera className="text-lg" />
                  <div className="leading-none text-sm">
                    {"Cập nhật ảnh đại diện"}
                  </div>
                </div>
              </div>
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
          rules={[
            {
              required: true,
              message: "Vui lòng chọn kỹ năng.",
            },
          ]}
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
