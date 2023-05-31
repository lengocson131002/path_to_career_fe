import { ServiceTypes } from "@/commons/enum";
import { formatDate } from "@/commons/utils";
import CardSkeleton from "@/components/core/CardSkeleton";
import PostApplication from "@/components/post-application/PostApplication";
import { getPostDetail } from "@/services/posts/services";
import { useQuery } from "@tanstack/react-query";
import { Avatar, Button, Card, Col, Row, Skeleton, Tag } from "antd";
import HTMLReactParser from "html-react-parser";
import { IoDocumentText } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";

const DynamicDashboard = () => {
  const { id } = useParams();
  const { data, isLoading, isSuccess } = useQuery([`p2c_post_${id}`], () => {
    if (id) {
      return getPostDetail(id);
    }
  });

  return (
    <div id="post-detail">
      <div className="flex w-full justify-between gap-16">
        <div className="w-full">
          <Skeleton paragraph={{ rows: 12 }} loading={!data || isLoading}>
            <div className="w-full">
              <div className="text-2xl font-bold">{data?.title}</div>
              <div className="bg-light-blue rounded-md shadow-md p-4 mt-4">
                <div>
                  <span className="font-bold">Dịch vụ cần thuê:</span>{" "}
                  <span className="underline text-primary">
                    <Link to={"/"}>
                      {data?.serviceType && ServiceTypes[data?.serviceType]}
                    </Link>
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
              <div>{HTMLReactParser(data?.content ?? "")}</div>
            </div>
          </Skeleton>
          {id && <PostApplication postId={id} />}
        </div>
        <CardSkeleton loading={!data || isLoading} className="w-[520px] h-fit">
          <Card>
            <div className="font-bold text-lg mb-2">Thông tin yêu cầu</div>
            <Row gutter={[4, 8]}>
              <Col className="font-bold" span={10}>
                ID dự án
              </Col>
              <Col span={14}>{data?.id}</Col>
              <Col className="font-bold" span={10}>
                Loại dịch vụ
              </Col>
              <Col span={14}>
                <Tag color="blue">
                  {data?.serviceType && ServiceTypes[data?.serviceType]}
                </Tag>
              </Col>
              <Col className="font-bold" span={10}>
                Lĩnh vực
              </Col>
              <Col span={14}>
                <Tag color="volcano">{data?.major.name}</Tag>
              </Col>
              <Col className="font-bold" span={10}>
                Vị trí làm việc
              </Col>
              <Col span={14}>{data?.jobPosition}</Col>
              {data?.finishTime ? (
                <>
                  <Col className="font-bold" span={10}>
                    Ngày đăng
                  </Col>
                  <Col span={14}>{formatDate(data?.finishTime)}</Col>
                </>
              ) : (
                <></>
              )}
              {data?.finishTime ? (
                <>
                  <Col className="font-bold" span={10}>
                    Hạn chót
                  </Col>
                  <Col span={14}>{formatDate(data?.finishTime)}</Col>
                </>
              ) : (
                <></>
              )}
            </Row>
            <div className="font-bold text-lg mt-8 mb-4">
              Thông tin khách hàng
            </div>
            <Row gutter={[4, 8]} align={"middle"}>
              <Col className="font-bold" span={6}>
                <Avatar src={data?.account?.avatar} size={60} />
              </Col>
              <Col span={18} className="font-bold">
                {data?.account?.fullName}
              </Col>
              {/* <Col className="font-bold" span={10}>
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
              <Col span={14}>5 công việc</Col> */}
            </Row>
            <Link to={`/tai-khoan/${data?.account?.id}`}>
              <Button type="primary" className="w-full mt-8">
                Liên hệ ngay
              </Button>
            </Link>
          </Card>
        </CardSkeleton>
      </div>
    </div>
  );
};

export default DynamicDashboard;
