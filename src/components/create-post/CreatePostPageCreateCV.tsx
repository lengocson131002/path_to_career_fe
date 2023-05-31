import { disableToCurrentTime, quillConfig } from "@/commons/config";
import { CvStyle, CvType, JobLevel, enumToList } from "@/commons/enum";
import { CreatePostForm } from "@/pages/bai-dang/tao-bai-dang";
import { getMajorCodes } from "@/services/majors/services";
import { useQuery } from "@tanstack/react-query";
import { Button, DatePicker, Form, Input, Select, UploadFile } from "antd";
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

function CreatePostPageCreateCV({
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
      onFinish={onFinish}
      name="basic"
      autoComplete="off"
      className="max-w-[600px]"
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
            message: "Vui lòng chọn lĩnh vực",
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
            message: "Vui lòng nhập vị trí",
          },
        ]}
      >
        <Input className="w-full" placeholder="Nhập vị trí làm việc" />
      </Form.Item>

      <Form.Item
        name="jobLevel"
        label={<label className="font-medium">Kinh nghiệm</label>}
        rules={[
          {
            required: true,
            message: "Vui lòng chọn kinh nghiệm",
          },
        ]}
      >
        <Select
          className="w-full"
          options={enumToList(JobLevel)}
          placeholder="Chọn kinh nghiệm"
        />
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
        name="cvType"
        label={<label className="font-medium">Loại CV</label>}
        rules={[
          {
            required: true,
            message: "Vui lòng chọn loại CV",
          },
        ]}
      >
        <Select
          className="w-full"
          options={enumToList(CvType)}
          placeholder="Chọn loại CV"
        />
      </Form.Item>

      <Form.Item
        name="cvStyle"
        label={<label className="font-medium">Hình thức CV</label>}
        rules={[
          {
            required: true,
            message: "Vui lòng chọn hình thức CV",
          },
        ]}
      >
        <Select
          className="w-full"
          options={enumToList(CvStyle)}
          placeholder="Chọn hình thức CV"
        />
      </Form.Item>
      <Form.Item
        name="media"
        label={<label className="font-medium">Upload hình ảnh cá nhân</label>}
        rules={[
          {
            required: true,
            message: "Vui lòng đăng tải hình ảnh cá nhân",
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
          <div>Nhấn hoặc kéo thả vào khu vực để đăng tải</div>
          <div className="text-p2c-gray">Chỉ hổ trợ tệp hình ảnh và pdf</div>
        </Dragger>
      </Form.Item>
      <div className="text-p2c-gray text-sm mt-2">
        Hình ảnh này sẽ được đưa vào CV của bạn
      </div>
      <Form.Item
        name="description"
        label={<label className="font-medium">Mô tả CV của bạn</label>}
        rules={[
          {
            required: true,
            message: "Vui lòng nhập mô tả CV",
          },
        ]}
      >
        <ReactQuill
          theme="snow"
          className="antd-input"
          placeholder="Mô tả CV của bạn"
          modules={quillConfig}
        />
      </Form.Item>
      <div className="text-p2c-gray text-sm mt-2">
        Hãy mô tả chi tiết các nội dung trong CV mà bạn muốn có để người viết có
        thể thực hiện chính xác hơn. Bạn nên có những thông tin sau trong mô tả:
        Thông tin cá nhân, summary giới thiệu bản thân, học vấn, kĩ năng, kinh
        nghiệm làm việc, sản phẩm, định hướng tương lai (nếu có),...
      </div>
      <Form.Item>
        <Button size="large" htmlType="submit" type="primary" className="mt-4">
          Tạo bài đăng
        </Button>
      </Form.Item>
    </Form>
  );
}

export default CreatePostPageCreateCV;
