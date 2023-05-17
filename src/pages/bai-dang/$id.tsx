import { Link, useParams } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import { Button, Card, Col, Grid, Row, Tag } from "antd";
import { IoDocumentText } from "react-icons/io5";

const DynamicDashboard = () => {
  const { id } = useParams();

  return (
    <MainLayout>
      <div id="post-detail">
        <div className="flex w-full justify-between gap-16">
          <div className="w-full">
            <div className="text-2xl font-bold">
              Cần người tạo CV ứng tuyển ngành CNTT
            </div>
            <div className="bg-light-blue rounded-md shadow-lg p-4 mt-4">
              <div>
                <span className="font-bold">Dịch vụ cần thuê:</span>{" "}
                <span className="underline text-primary">
                  <Link to={"/"}>Tạo CV</Link>
                </span>
              </div>{" "}
              <div>
                <span className="font-bold">
                  Bạn có thể cung cấp dịch vụ này?
                </span>{" "}
                <span className="underline text-primary">
                  <Link to={"/"}>Thêm vào hồ sơ</Link>
                </span>
              </div>
            </div>
            <div className="text-xl flex items-center gap-2 font-bold mt-8">
              <IoDocumentText />
              Mô tả công việc
            </div>
            <div>
              We are seeking a skilled Digital Marketing Professional to join
              our team at Surfline Media. The ideal candidate will be
              responsible for developing and executing digital marketing
              campaigns to promote our company's products or services. You will
              have a deep understanding of digital marketing trends and
              techniques, as well as experience in using marketing automation
              tools to increase lead generation and customer conversion rates.
              You will work closely with our sales and creative teams to develop
              and execute effective campaigns, measure their success, and
              continuously improve our marketing efforts. <br />
              <br /> Key Responsibilities: • Develop and implement digital
              marketing campaigns across multiple channels, including email,
              social media, search engines, and display advertising. • Use data
              analytics to evaluate and optimize campaigns for maximum ROI. •
              Collaborate with our creative team to develop engaging and
              effective marketing content. • Manage and monitor our web and
              social media platforms, ensuring they are up-to-date and
              effective. • Conduct market research and analysis to identify new
              opportunities and trends. • Stay up-to-date with industry trends
              and emerging technologies and identify ways to incorporate them
              into our digital marketing strategies. • Collaborate with sales
              and customer service teams to ensure alignment with marketing
              initiatives and goals.
              <br />
              <br /> Requirements: • Bachelor's degree in marketing, business,
              or a related field. • Minimum of 3 years of experience in digital
              marketing, with a proven track record of success. • Fluent English
              skills in listening, speaking, reading, and writing are required •
              Strong knowledge of marketing automation tools and data analytics.
              • Experience in developing and executing digital marketing
              campaigns across multiple channels. • Excellent communication and
              collaboration skills, with the ability to work effectively with
              cross-functional teams. • Ability to think creatively and
              strategically, with a passion for staying up-to-date with industry
              trends and emerging technologies. <br />
              <br />
              If you are a results-driven, creative, and analytical digital
              marketing professional with a proven track record of success, we
              would love to hear from you. Apply today and become a part of our
              dynamic team at Surfline Media.
            </div>
          </div>
          <Card className="w-[520px] h-fit">
            <div className="font-bold text-lg mb-2">Thông tin yêu cầu</div>
            <Row gutter={[4, 8]}>
              <Col className="font-bold" span={10}>
                ID dự án
              </Col>
              <Col span={14}>1652</Col>
              <Col className="font-bold" span={10}>
                Loại dịch vụ
              </Col>
              <Col span={14}>
                <Tag color="blue">Tạo CV</Tag>
              </Col>
              <Col className="font-bold" span={10}>
                Lĩnh vực
              </Col>
              <Col span={14}>
                <Tag color="volcano">Công nghệ thông tin</Tag>
              </Col>
              <Col className="font-bold" span={10}>
                Vị trí làm việc
              </Col>
              <Col span={14}>Chuyên viên lập trình Website</Col>
              <Col className="font-bold" span={10}>
                Ngày đăng
              </Col>
              <Col span={14}>13/10/2023 13:08:23</Col>
              <Col className="font-bold" span={10}>
                Hạn chót
              </Col>
              <Col span={14}>20/10/2023 13:08:23</Col>
              <Col className="font-bold" span={10}>
                Ngân sách
              </Col>
              <Col span={14}>500.000đ - 1.000.000đ</Col>
            </Row>
            <div className="font-bold text-lg mt-8 mb-2">
              Thông tin khách hàng
            </div>
            <Row gutter={[4, 8]}>
              <Col className="font-bold" span={10}>
                Tham gia
              </Col>
              <Col span={14}>13/10/2023 13:08:23</Col>
              <Col className="font-bold" span={10}>
                Đã đăng
              </Col>
              <Col span={14}>1 công việc</Col>{" "}
              <Col className="font-bold" span={10}>
                Đã nhận
              </Col>
              <Col span={14}>5 công việc</Col>
            </Row>
            <Button type="primary" className="w-full mt-8">
              Liên hệ ngay
            </Button>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default DynamicDashboard;
