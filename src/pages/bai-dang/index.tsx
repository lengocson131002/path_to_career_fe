import { Tag, TreeSelect, Card, Pagination } from "antd";
import { useState } from "react";
import { ServiceEnum } from "../../adapter/ServiceAdapter";
import Banner from "../../assets/banner.png";
import MainLayout from "../../layouts/MainLayout";
const { SHOW_PARENT } = TreeSelect;

const treeData = [
  {
    title: <div className="text-primary font-semibold">Dịch vụ</div>,
    value: "0-0",
    key: "0-0",
    checkable: false,
    children: [
      {
        title: ServiceEnum["REVIEW_CV"],
        value: "0-0-0",
        key: "0-0-0",
      },
      {
        title: ServiceEnum["CREATE_CV"],
        value: "0-0-1",
        key: "0-0-1",
      },
      {
        title: ServiceEnum["MOCK_INTERVIEW"],
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

  const onChange = (newValue: string[]) => {
    console.log("onChange ", value);
    setValue(newValue);
  };

  return (
    <MainLayout>
      <img src={Banner} alt="banner_img" className="w-full my-8" />
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
          {[1, 2, 3, 4].map(() => (
            <Card
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
                <div className="text-primary font-semibold">
                  Hạn chót:{" "}
                  <span className="text-black font-normal">
                    20/10/2023 13:08:23
                  </span>
                </div>
                <div className="text-primary font-semibold">
                  Ngân sách:{" "}
                  <span className="text-black font-normal">
                    500.000đ - 1.000.000đ
                  </span>
                </div>
              </div>
            </Card>
          ))}
          <Pagination className="flex justify-end w-full"></Pagination>
        </div>
      </div>
    </MainLayout>
  );
}

export default PostPage;
