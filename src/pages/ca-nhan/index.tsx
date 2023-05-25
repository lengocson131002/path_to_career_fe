import AccountInformationCard from "@/components/account/AccountInformationCard";
import { getMe } from "@/services/accounts/services";
import { useQuery } from "@tanstack/react-query";
import { Avatar, Button, Col, Row, Tag } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

function AccountPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const { data } = useQuery(["p2c_me"], getMe);

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
              <div className="font-bold text-2xl">{data?.name}</div>
              <div className="text-p2c-gray mt-2 mb-4">{data?.description}</div>
              <div className="">
                {data?.majors?.map((major, index) => (
                  <Tag color="green" key={index}>
                    {major.name}
                  </Tag>
                ))}
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
          <AccountInformationCard loading={loading} user={data} />
          <Link to={"/ca-nhan/cap-nhat"}>
            <Button type="primary" className="w-full mt-4">
              Cập nhật thông tin
            </Button>
          </Link>
        </Col>
      </Row>
    </div>
  );
}

export default AccountPage;
