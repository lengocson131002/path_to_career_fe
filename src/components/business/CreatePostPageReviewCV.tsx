import { InboxOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Select, UploadProps, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import Dragger from "antd/es/upload/Dragger";
import { AiFillTag, AiTwotoneSetting } from "react-icons/ai";
import { HiOutlineInformationCircle } from "react-icons/hi";

const props: UploadProps = {
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

function CreatePostPageMockInterview() {
  return (
    <Form layout="vertical" className="w-[500px]">
      <div className="flex text-primary items-end text-2xl mb-4 font-semibold gap-2">
        <HiOutlineInformationCircle className="text-3xl" />
        Thông tin ứng tuyển
      </div>
      <Form.Item name="userPhone" noStyle>
        <label htmlFor="user_phone" className="font-medium mb-1 block">
          Lĩnh vực ứng tuyển
        </label>
        <Select
          defaultValue="lucy"
          className="w-full"
          options={[
            { value: "jack", label: "Jack" },
            { value: "lucy", label: "Lucy" },
            { value: "Yiminghe", label: "yiminghe" },
            { value: "disabled", label: "Disabled", disabled: true },
          ]}
        />
      </Form.Item>

      <Form.Item name="userEmail" noStyle>
        <label htmlFor="user_email" className="font-medium mt-3 mb-1 block">
          Vị trí làm việc
        </label>
        <Select
          defaultValue="lucy"
          className="w-full"
          options={[
            { value: "jack", label: "Jack" },
            { value: "lucy", label: "Lucy" },
            { value: "Yiminghe", label: "yiminghe" },
            { value: "disabled", label: "Disabled", disabled: true },
          ]}
        />
      </Form.Item>
      <div className="flex text-primary items-end text-2xl my-4 font-semibold gap-2">
        <AiFillTag className="text-3xl" />
        Thông tin bài đăng
      </div>
      <Form.Item name="userName" noStyle>
        <label htmlFor="user_name" className="font-medium  mt-3 mb-1 block">
          Dịch vụ cần thuê
        </label>
        <Select
          defaultValue="lucy"
          className="w-full"
          options={[
            { value: "jack", label: "Jack" },
            { value: "lucy", label: "Lucy" },
            { value: "Yiminghe", label: "yiminghe" },
            { value: "disabled", label: "Disabled", disabled: true },
          ]}
        />
      </Form.Item>

      <Form.Item name="userPwd" noStyle>
        <label htmlFor="user_email" className="font-medium mt-3 mb-1 block">
          Hạn chót
        </label>
        <DatePicker showTime placement="topRight" className="w-full" />
      </Form.Item>

      <Form.Item name="userPwd" noStyle>
        <label htmlFor="user_email" className="font-medium mt-3 mb-1 block">
          Nội dung bài đăng
        </label>
        <TextArea rows={4} placeholder="maxLength is 6" maxLength={6} />
      </Form.Item>

      <div className="flex text-primary items-end text-2xl my-4 font-semibold gap-2">
        <AiTwotoneSetting className="text-3xl" />
        Thông tin chi tiết
      </div>
      <Form.Item name="userPwd" noStyle>
        <label htmlFor="user_email" className="font-medium mt-3 mb-1 block">
          Nội dung bài đăng
        </label>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from
            uploading company data or other banned files.
          </p>
        </Dragger>
      </Form.Item>
      <Form.Item noStyle></Form.Item>
      <div className="flex gap-4 mt-4">
        <Form.Item noStyle>
          <Button type="primary">Tạo bài đăng</Button>
          <Button danger>Thoát</Button>
        </Form.Item>
      </div>
    </Form>
  );
}

export default CreatePostPageMockInterview;
