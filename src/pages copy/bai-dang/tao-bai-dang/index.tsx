import { ServiceTypes } from "@/commons/enum";
import CreatePostPageCreateCV from "@/components/business/CreatePostPageCreateCV";
import CreatePostPageMockInterview from "@/components/business/CreatePostPageMockInterview";
import CreatePostPageReviewCV from "@/components/business/CreatePostPageReviewCV";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Col, Row, Tabs } from "antd";
import { useState } from "react";
import { HiOutlineDocumentText } from "react-icons/hi";
import { Link } from "react-router-dom";

function ReviewCVPage() {
  const [service, setService] = useState<ServiceTypes>(ServiceTypes.REVIEW_CV);
  return (
    <Row gutter={[24, 24]}>
      <Col span={8}></Col>
      <Col span={16}>
        <Breadcrumb
          items={[
            {
              title: (
                <Link to={"/"}>
                  <HomeOutlined />
                </Link>
              ),
            },
            {
              href: "",
              title: (
                <Link to={"/bai-dang"}>
                  <div className="flex items-center gap-1">
                    <HiOutlineDocumentText className="text-lg" />
                    <div>Bài đăng</div>
                  </div>
                </Link>
              ),
            },
            {
              title: service,
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
          }
        })()}
      </Col>
    </Row>
  );
}

export default ReviewCVPage;
