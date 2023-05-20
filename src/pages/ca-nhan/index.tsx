import CardSkeleton from "@/components/core/CardSkeleton";
import { Avatar, Button, Card, Col, Row, Skeleton, Tag } from "antd";
import { useState } from "react";
import { AiTwotoneHome, AiTwotonePhone } from "react-icons/ai";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { GrMail } from "react-icons/gr";

function UserPage() {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className="flex w-ful">
      <Row className="w-full px-20">
        <Col span={16}>
          <Row gutter={[20, 0]}>
            <Col span={6}>
              <div className="w-full flex justify-center">
                <Avatar size={160}>H</Avatar>
              </div>
            </Col>
            <Col span={18}>
              <div className="font-bold text-2xl">Nguyễn Thanh Hà</div>
              <div className="text-p2c-gray mt-2 mb-4">Software Engineer</div>
              <div className="">
                <Tag color="green">Java</Tag>
                <Tag color="green">SQL</Tag>
                <Tag color="green">HTML</Tag>
                <Tag color="green">Javascript</Tag>
                <Tag color="green">Java web</Tag>
                <Tag color="green">CSS</Tag>
              </div>
              <div className="font-bold text-xl mt-16">Giới thiệu</div>
              <ul>
                <li>Sinh viên năm 3 đại học FPT HCM</li>
                <li>Chuyên môn về vị trí Back-end</li>
              </ul>
              <div className="font-bold text-xl mt-6">Dịch vụ</div>
              <ul>
                <li>Phát triển ứng dụng web</li>
                <li>Chuyên môn về vị trí Back-end</li>
              </ul>
            </Col>
          </Row>
        </Col>
        <Col span={8}>
          <CardSkeleton loading={loading}>
            <div className="font-semibold mb-4">Thông tin liên lạc</div>
            <Row gutter={8}>
              <Col flex="20px">
                <BsFillPersonVcardFill className="align-text-bottom text-xl" />
              </Col>
              <Col flex="auto">26/02/2002</Col>
            </Row>
            <Row gutter={8}>
              <Col flex="20px">
                <GrMail className="align-text-bottom text-xl" />
              </Col>
              <Col flex="auto">nthoreoo2602@gmail.com</Col>
            </Row>
            <Row gutter={8}>
              <Col flex="20px">
                <AiTwotonePhone className="align-text-bottom text-xl" />
              </Col>
              <Col flex="auto">0382913108</Col>
            </Row>
            <Row gutter={8}>
              <Col flex="20px">
                <AiTwotoneHome className="align-text-bottom text-xl" />
              </Col>
              <Col flex="auto">
                89/18 Làng Tăng Phú, Tăng Nhơn Phú A, Quận 9, TP. HCM
              </Col>
            </Row>
          </CardSkeleton>
          <Button type="primary" className="w-full mt-4">
            Cập nhật thông tin
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default UserPage;
