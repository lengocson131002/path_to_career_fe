import { Button, Card, Tag } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

function HomePost({}: Props) {
  const navigate = useNavigate();
  return (
    <>
      <div className="home__section w-full px-4 flex justify-between mt-40 mb-20">
        <div className="home__section--title text-4xl font-medium">
          Bài đăng mới nhất
        </div>
        <div className="home__section--more">
          <Button type="link" className="text-primary font-medium w-28">
            Xem thêm
          </Button>
        </div>
      </div>
      <div className="home__post w-full">
        <div className="home__post--list flex flex-col gap-5">
          {[1, 2, 3, 4].map((item, index) => (
            <Card
              key={index}
              className="cursor-pointer"
              title={
                <div className="flex gap-4 items-end">
                  <div className="font-bold text-lg">
                    Cần người tạo CV ứng tuyển ngành CNTT
                  </div>
                  <div className="text-p2c-grey text-sm self-center">
                    2 phút trước
                  </div>
                </div>
              }
              extra={
                <div>
                  <Tag color="blue">Tạo CV</Tag>
                  <Tag color="volcano">Công nghệ thông tin</Tag>
                </div>
              }
              onClick={() => {
                navigate(`/bai-dang/${item}`);
              }}
            >
              <div className="flex flex-col gap-2">
                <div>
                  We are seeking a skilled Digital Marketing Professional to
                  join our team at Surfline Media. The ideal candidate will be
                  responsible for developing and executing digital marketing
                  campaigns to promote our company's products or services. You
                  will have a deep understanding of digital marketing trends and
                  techniques, as well as experience in using marketing...{" "}
                  <span className="text-primary">Xem thêm</span>
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
        </div>
      </div>
    </>
  );
}

export default HomePost;
