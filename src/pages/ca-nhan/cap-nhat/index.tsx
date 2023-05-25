import UpdateAccountInformation from "@/components/account/UpdateAccountInformation";
import { getMe } from "@/services/accounts/services";
import { useQuery } from "@tanstack/react-query";
import { Col, Row, Tabs } from "antd";
import { useState } from "react";

const tabs = [
  {
    key: "information",
    label: "Tài khoản",
  },
  {
    key: "upgrade-package",
    label: "Nâng cấp gói Freelancer",
  },
];
function UpdateAccountPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const { data } = useQuery(["p2c_me"], getMe);
  const [tab, setTab] = useState<string>("information");

  return (
    <div className="">
      <Row gutter={[24, 24]}>
        <Col span={8}>
          <Tabs
            className="sticky float-right"
            defaultActiveKey="1"
            tabPosition={"left"}
            size="large"
            items={tabs}
            onChange={(activeKey) => setTab(activeKey)}
          />
        </Col>
        <Col span={16}>
          {(() => {
            switch (tab) {
              case "information":
                return <UpdateAccountInformation />;
            }
          })()}
        </Col>
      </Row>
    </div>
  );
}

export default UpdateAccountPage;
