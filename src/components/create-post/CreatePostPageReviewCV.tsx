import { disableToCurrentTime, quillConfig } from "@/commons/config";
import { CreatePostForm } from "@/pages/bai-dang/tao-bai-dang";
import { getMajorCodes } from "@/services/majors/services";
import { useQuery } from "@tanstack/react-query";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  UploadFile,
} from "antd";
import Dragger from "antd/es/upload/Dragger";
import dayjs from "dayjs";
import {
  AiFillTag,
  AiOutlineCloudUpload,
  AiTwotoneSetting,
} from "react-icons/ai";
import { HiOutlineInformationCircle } from "react-icons/hi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function CreatePostPageReviewCV({
  onFinish,
  onUpload,
  fileUrl,
  file,
  setFile,
}: {
  onFinish: (values: CreatePostForm) => void;
  onUpload: (file: UploadFile) => void;
  setFile: (value?: UploadFile) => void;
  fileUrl?: string;
  file?: UploadFile;
}) {
  const majors = useQuery(["p2c_major_codes"], getMajorCodes);

  return (
    <Form
      layout="vertical"
      className="max-w-[600px]"
      onFinish={onFinish}
      name="basic"
      autoComplete="off"
    >
      <div className="flex text-primary items-end text-2xl mb-4 font-semibold gap-2">
        <HiOutlineInformationCircle className="text-3xl" />
        Thông tin ứng tuyển
      </div>
      <Form.Item
        name="majorCode"
        label={<label className="font-medium">Lĩnh vực ứng tuyển</label>}
        rules={[
          {
            required: true,
            message: "Vui lòng chọn lĩnh vực ứng tuyển",
          },
        ]}
      >
        <Select
          placeholder="Chọn lĩnh vực"
          className="w-full"
          options={majors.data?.map((d) => ({
            label: d.name,
            value: d.code,
          }))}
        />
      </Form.Item>

      <Form.Item
        name="jobPosition"
        label={<label className="font-medium">Vị trí làm việc</label>}
        rules={[
          {
            required: true,
            message: "Vui lòng nhập vị trí làm việc",
          },
        ]}
      >
        <Input className="w-full" placeholder="Nhập vị trí làm việc" />
      </Form.Item>

      <div className="flex text-primary items-end text-2xl my-4 font-semibold gap-2">
        <AiFillTag className="text-3xl" />
        Thông tin bài đăng
      </div>

      <Form.Item
        name="finishTime"
        label={<label className="font-medium">Hạn chót</label>}
        rules={[
          {
            required: true,
            message: "Vui lòng chọn hạn chót",
          },
        ]}
      >
        <DatePicker
          showTime
          placement="topRight"
          className="w-full"
          placeholder="Chọn hạn chót"
          disabledDate={(current) =>
            current && current < dayjs().add(-1, "day")
          }
          showSecond={false}
          disabledTime={disableToCurrentTime}
          showNow={false}
        />
      </Form.Item>

      <Form.Item
        name="title"
        label={<label className="font-medium">Tiêu đề</label>}
        rules={[
          {
            required: true,
            message: "Vui lòng nhập tiêu đề",
          },
        ]}
      >
        <Input className="w-full" placeholder="Nhập tiêu đề" />
      </Form.Item>
      <Form.Item
        name="content"
        label={<label className="font-medium">Nội dung bài đăng</label>}
        rules={[
          {
            required: true,
            message: "Vui lòng nhập nội dung bài đăng",
          },
        ]}
      >
        <ReactQuill
          theme="snow"
          className="antd-input"
          placeholder="Nhập nội dung bài đăng"
          modules={quillConfig}
        />
      </Form.Item>

      <div className="flex text-primary items-end text-2xl my-4 font-semibold gap-2">
        <AiTwotoneSetting className="text-3xl" />
        Thông tin chi tiết
      </div>
      <Form.Item
        name="media"
        label={<label className="font-medium">Upload CV của bạn</label>}
        rules={[
          {
            required: true,
            message: "Vui lòng đăng tải CV của bạn",
          },
        ]}
      >
        <Dragger
          onRemove={() => setFile(undefined)}
          maxCount={1}
          fileList={file ? [file] : []}
          multiple={false}
          onChange={(info) => {
            onUpload(info.file);
          }}
          beforeUpload={(file) => {
            return false;
          }}
          accept="image/jpeg,image/png,application/pdf"
        >
          <AiOutlineCloudUpload className="text-4xl" />
          <div>Nhấn hoặc kéo thả vào khu vực để đăng tải</div>{" "}
          <div className="text-p2c-gray">Chỉ hổ trợ tệp hình ảnh và pdf</div>
        </Dragger>
      </Form.Item>
      <Form.Item name="supportCount" className="w-full">
        <div className="w-full flex justify-between items-center">
          <label className="font-medium">
            Bạn muốn review tối đa bao nhiêu lần:
          </label>
          <InputNumber min={1} max={10} defaultValue={3} />
        </div>
      </Form.Item>

      <Form.Item
        name="description"
        label={
          <label className="font-medium">Mô tả yêu cầu đối với reviewer</label>
        }
        rules={[
          {
            required: true,
            message: "Vui lòng nhập mô tả yêu cầu đối với reviewer",
          },
        ]}
      >
        <ReactQuill
          theme="snow"
          className="antd-input"
          placeholder="Mô tả yêu cầu đối với reviewer"
          modules={quillConfig}
        />
      </Form.Item>
      <Form.Item>
        <Button size="large" htmlType="submit" type="primary" className="mt-4">
          Tạo bài đăng
        </Button>
      </Form.Item>
    </Form>
  );
}

export default CreatePostPageReviewCV;
