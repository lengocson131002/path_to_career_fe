import CardSkeleton from "@/components/core/CardSkeleton";
import { AccountModel } from "@/services/accounts/models";
import { Col, Row } from "antd";
import { AiTwotoneHome, AiTwotonePhone } from "react-icons/ai";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { GrMail } from "react-icons/gr";

function AccountInformationCard({
  loading,
  user,
}: {
  loading: boolean;
  user?: AccountModel;
}) {
  return (
    <>
      <CardSkeleton loading={loading || !user}>
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
          <Col flex="auto">{user?.email}</Col>
        </Row>
        <Row gutter={8}>
          <Col flex="20px">
            <AiTwotonePhone className="align-text-bottom text-xl" />
          </Col>
          <Col flex="auto">{user?.phone}</Col>
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
    </>
  );
}

export default AccountInformationCard;
