import Banner from "@/assets/banner.png";
import { ServiceTypes } from "@/commons/enum";
import { Card, Pagination, Tag, TreeSelect } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const { SHOW_PARENT } = TreeSelect;

const treeData = [
  {
    title: <div className="text-primary font-semibold">Dịch vụ</div>,
    value: "0-0",
    key: "0-0",
    checkable: false,
    children: [
      {
        title: ServiceTypes.REVIEW_CV,
        value: "0-0-0",
        key: "0-0-0",
      },
      {
        title: ServiceTypes.CREATE_CV,
        value: "0-0-1",
        key: "0-0-1",
      },
      {
        title: ServiceTypes.MOCK_INTERVIEW,
        value: "0-0-2",
        key: "0-0-2",
      },
    ],
  },
  {
    title: <div className="text-primary font-semibold">Lĩnh vực</div>,
    value: "0-1",
    key: "0-1",
    checkable: false,
    children: [
      {
        title: "Công nghệ thông tin",
        value: "0-1-0",
        key: "0-1-0",
      },
      {
        title: "Đồ họa",
        value: "0-1-1",
        key: "0-1-1",
      },
      {
        title: "Kinh tế",
        value: "0-1-2",
        key: "0-1-2",
      },
    ],
  },
];
function PostPage() {
  const [value, setValue] = useState<string[]>([]);
  const navigate = useNavigate();

  const onChange = (newValue: string[]) => {
    console.log("onChange ", value);
    setValue(newValue);
  };

  return (
    <>
      <img src={Banner} alt="banner_img" className="w-full mb-8" />
      <div className="flex gap-12">
        <div className="sticky top-10">
          <TreeSelect
            treeData={treeData}
            value={value}
            onChange={onChange}
            treeCheckable
            showCheckedStrategy={SHOW_PARENT}
            placeholder={"Vui lòng chọn"}
            style={{
              width: 260,
            }}
            tagRender={({ label, value, closable, onClose }) => (
              <Tag
                color={"volcano"}
                closable={closable}
                onClose={onClose}
                style={{ marginRight: 3 }}
              >
                {label}
              </Tag>
            )}
            treeDefaultExpandAll
            showSearch
            size="large"
            open={true}
            dropdownStyle={{
              zIndex: 0,
              marginTop: 24,
              boxShadow: "none",
            }}
          />
        </div>
        <div className="w-full flex flex-col gap-4">
          {[1, 2, 3, 4].map((_, index) => (
            <Card
              key={index}
              className="cursor-pointer"
              title={
                <div className="flex gap-4 items-end">
                  <div className="font-bold text-lg">
                    Cần người tạo CV ứng tuyển ngành CNTT
                  </div>
                  <div className="text-secondary text-sm">2 phút trước</div>
                </div>
              }
              extra={
                <div>
                  <Tag color="blue">Tạo CV</Tag>
                  <Tag color="volcano">Công nghệ thông tin</Tag>
                </div>
              }
              onClick={() => {
                navigate("/bai-dang/1");
              }}
            >
              <div className="flex flex-col gap-2">
                <div>Nguyễn Văn A</div>
                <div>
                  We are seeking a skilled Digital Marketing Professional to
                  join our team at Surfline Media. The ideal candidate will be
                  responsible for developing and executing digital marketing
                  campaigns to promote our company’s products or services. You
                  will have a deep understanding of digital marketing trends and
                  techniques, as well as experience in using marketing... Xem
                  thêm
                </div>
                <div>
                  <span className="text-primary font-semibold">Hạn chót:</span>{" "}
                  20/10/2023 13:08:23
                </div>
                <div>
                  <span className="text-primary font-semibold">Ngân sách:</span>{" "}
                  500.000đ - 1.000.000đ
                </div>
              </div>
            </Card>
          ))}
          <Pagination className="flex justify-end w-full"></Pagination>
        </div>
      </div>
    </>
  );
}

export default PostPage;
