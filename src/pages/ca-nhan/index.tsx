import AccountInformationCard from "@/components/account/AccountInformationCard";
import { AppState } from "@/stores";
import { Avatar, Button, Col, Row, Tag } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function AccountPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const { account } = useSelector((state: AppState) => state.user);

  return (
    <div className="flex w-ful">
      <Row className="w-full lg:px-20">
        <Col span={16}>
          <Row gutter={[20, 0]}>
            <Col xl={6}>
              <div className="w-full flex justify-center">
                <Avatar size={160} src={account?.avatar}>
                  {account?.email}
                </Avatar>
              </div>
            </Col>
            <Col xl={18}>
              <div className="font-bold text-2xl">{account?.name}</div>
              <div className="text-p2c-gray mt-2 mb-4">
                {account?.description}
              </div>
              <div className="flex gap-2">
                {account?.majors?.map((major, index) => (
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
          <AccountInformationCard loading={loading} user={account} />
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
