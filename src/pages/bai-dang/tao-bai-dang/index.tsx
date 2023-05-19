import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Col, Row, Tabs } from "antd";
import CreatePostPageReviewCV from "../../../components/business/CreatePostPageReviewCV";
import MainLayout from "../../../layouts/MainLayout";
import { useState } from "react";
import { ServiceTypes } from "../../../commons/enum";
import CreatePostPageCreateCV from "../../../components/business/CreatePostPageCreateCV";
import CreatePostPageMockInterview from "../../../components/business/CreatePostPageReviewCV";

function ReviewCVPage() {
  const [service, setService] = useState<ServiceTypes>(ServiceTypes.REVIEW_CV);
  return (
    <MainLayout>
      <Row gutter={[24, 24]}>
        <Col span={8}></Col>
        <Col span={16}>
          <Breadcrumb
            items={[
              {
                href: "",
                title: <HomeOutlined />,
              },
              {
                href: "",
                title: (
                  <>
                    <UserOutlined />
                    <span>Bài đăng</span>
                  </>
                ),
              },
              {
                title: "Review CV",
              },
            ]}
          />
        </Col>
        <Col span={8}>
          <Tabs
            className="sticky float-right"
            defaultActiveKey="1"
            tabPosition={"left"}
            size="large"
            items={Object.keys(ServiceTypes).map((type, i) => {
              const id = String(i);
              return {
                label: Object.values(ServiceTypes)[i],
                key: type,
              };
            })}
            onChange={(activeKey) =>
              setService(ServiceTypes[activeKey as keyof typeof ServiceTypes])
            }
          />
        </Col>
        <Col span={16}>
          {(() => {
            switch (service) {
              case ServiceTypes.REVIEW_CV:
                return <CreatePostPageReviewCV />;
              case ServiceTypes.CREATE_CV:
                return <CreatePostPageCreateCV />;
              case ServiceTypes.MOCK_INTERVIEW:
                return <CreatePostPageMockInterview />;
              default:
                console.log(String(service));
            }
          })()}
        </Col>
      </Row>
    </MainLayout>
  );
}

export default ReviewCVPage;
