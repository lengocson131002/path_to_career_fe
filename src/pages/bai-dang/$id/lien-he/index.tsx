import { CvStyle, CvType, JobLevel, ServiceTypes } from "@/commons/enum";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Col, Row } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { HiOutlineDocumentText } from "react-icons/hi";
import { Link } from "react-router-dom";

export interface CreatePostForm {
  title: string;
  jobPosition: string;
  jobLevel: JobLevel;
  finishTime: dayjs.Dayjs;
  content: string;
  supportCount?: number;
  mediaUrl: string;
  cvStyle: CvStyle;
  cvType: CvType;
  majorCode: string;
}
function PostPaymentPage() {
  const [service, setService] = useState<ServiceTypes>(ServiceTypes.ReviewCV);

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
      <Col span={8}></Col>
      <Col span={16}></Col>
    </Row>
  );
}

export default PostPaymentPage;
