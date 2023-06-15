import { PostStatus, PostStatusColor, ServiceTypes } from "@/commons/enum";
import { formatDate } from "@/commons/utils";
import ChatBox from "@/components/chat/ChatBox";
import CardSkeleton from "@/components/core/CardSkeleton";
import { getPostDetail } from "@/services/posts/services";
import { useQuery } from "@tanstack/react-query";
import { Card, Col, Row, Skeleton, Tag } from "antd";
import HTMLReactParser from "html-react-parser";
import { IoDocumentText } from "react-icons/io5";
import { useParams } from "react-router-dom";

function Contact() {
  const { id } = useParams();
  const { data, isLoading, isSuccess } = useQuery([`p2c_post_${id}`], () => {
    if (id) {
      return getPostDetail(id);
    }
  });

  return (
    data && (
      <div id="post-detail">
        <Row gutter={24}>
          <Col span={10}>
            <Row gutter={[40, 40]}>
              <Col span={24}>
                <CardSkeleton loading={!data || isLoading} className="h-fit">
                  <Card>
                    <div className="font-bold text-lg mb-2">
                      Thông tin yêu cầu
                    </div>
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
                      {data?.createdAt ? (
                        <>
                          <Col className="font-bold" span={10}>
                            Ngày đăng
                          </Col>
                          <Col span={14}>{formatDate(data?.createdAt)}</Col>
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
                  </Card>
                </CardSkeleton>
              </Col>
              <Col span={24}>
                <Skeleton paragraph={{ rows: 12 }} loading={!data || isLoading}>
                  <div className="w-full">
                    <div className="text-2xl font-bold">
                      {data?.title}
                      <span>
                        <Tag
                          className="ml-4"
                          color={PostStatusColor[data.status]}
                        >
                          {PostStatus[data.status]}
                        </Tag>
                      </span>
                    </div>
                    <div className="text-xl flex items-center gap-2 font-bold mt-8">
                      <IoDocumentText />
                      Mô tả công việc
                    </div>
                    <div>{HTMLReactParser(data?.content ?? "")}</div>
                    <div className="text-xl flex items-center gap-2 font-bold mt-8">
                      <IoDocumentText />
                      Mô tả yêu cầu
                    </div>
                    <div>{HTMLReactParser(data?.description ?? "")}</div>
                  </div>
                </Skeleton>
              </Col>
            </Row>
          </Col>
          {data.freelancer && (
            <Col span={14} className="h-full -mt-4">
              <ChatBox receiver={data.freelancer} postId={data.id}></ChatBox>
            </Col>
          )}
        </Row>
      </div>
    )
  );
}

export default Contact;
