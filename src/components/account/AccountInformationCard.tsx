import { Roles } from "@/commons/enum";
import CardSkeleton from "@/components/core/CardSkeleton";
import { AccountModel } from "@/services/accounts/models";
import { Card, Col, Row } from "antd";
import { AiTwotonePhone } from "react-icons/ai";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { FaUserCog } from "react-icons/fa";
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
        <Card>
          <div className="font-semibold mb-4">Thông tin liên lạc</div>
          <Row gutter={8} className="mb-2">
            <Col flex="20px">
              <BsFillPersonVcardFill className="align-text-bottom text-xl" />
            </Col>
            <Col flex="auto">26/02/2002</Col>
          </Row>
          <Row gutter={8} className="mb-2">
            <Col flex="20px">
              <GrMail className="align-text-bottom text-xl" />
            </Col>
            <Col flex="auto">{user?.email}</Col>
          </Row>
          {user?.phone && (
            <Row gutter={8} className="mb-2">
              <Col flex="20px">
                <AiTwotonePhone className="align-text-bottom text-xl" />
              </Col>
              <Col flex="auto">{user?.phone}</Col>
            </Row>
          )}
          <Row gutter={8} className="mb-2">
            <Col flex="20px">
              <FaUserCog className="align-text-bottom text-xl" />
            </Col>
            <Col flex="auto">{user?.role && Roles[user?.role]}</Col>
          </Row>
        </Card>
      </CardSkeleton>
    </>
  );
}

export default AccountInformationCard;
