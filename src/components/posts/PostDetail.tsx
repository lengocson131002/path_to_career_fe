import { PostStatus, PostStatusColor, ServiceTypes } from "@/commons/enum";
import { formatDate } from "@/commons/utils";
import CardSkeleton from "@/components/core/CardSkeleton";
import { PostDetailModel } from "@/services/posts/models";
import { Avatar, Button, Card, Col, Row, Skeleton, Tag } from "antd";
import HTMLReactParser from "html-react-parser";
import { Dispatch, SetStateAction } from "react";
import { IoDocumentText } from "react-icons/io5";
import { Link } from "react-router-dom";

function PostDetail({
  post,
  setShowChat,
  isLoading,
}: {
  post: PostDetailModel;
  setShowChat: Dispatch<SetStateAction<boolean>>;
  isLoading?: boolean;
}) {
  return (
    <div id="post-detail">
      <Row gutter={[40, 40]}>
        <Col span={16}>
          <Skeleton paragraph={{ rows: 12 }} loading={!post || isLoading}>
            <div className="w-full">
              <div className="text-2xl font-bold">
                {post?.title}
                <span>
                  <Tag className="ml-4" color={PostStatusColor[post.status]}>
                    {PostStatus[post.status]}
                  </Tag>
                </span>
              </div>
              <div className="text-xl flex items-center gap-2 font-bold mt-8">
                <IoDocumentText />
                Mô tả công việc
              </div>
              <div>{HTMLReactParser(post?.content ?? "")}</div>
              <div className="text-xl flex items-center gap-2 font-bold mt-8">
                <IoDocumentText />
                Mô tả yêu cầu
              </div>
              <div>{HTMLReactParser(post?.description ?? "")}</div>
            </div>
          </Skeleton>
        </Col>
        <Col span={8}>
          <CardSkeleton loading={!post || isLoading} className="h-fit">
            <Card>
              <div className="font-bold text-lg mb-2">Thông tin yêu cầu</div>
              <Row gutter={[4, 8]}>
                <Col className="font-bold" span={10}>
                  ID dự án
                </Col>
                <Col span={14}>{post?.id}</Col>
                <Col className="font-bold" span={10}>
                  Loại dịch vụ
                </Col>
                <Col span={14}>
                  <Tag color="blue">
                    {post?.serviceType && ServiceTypes[post?.serviceType]}
                  </Tag>
                </Col>
                <Col className="font-bold" span={10}>
                  Lĩnh vực
                </Col>
                <Col span={14}>
                  <Tag color="volcano">{post?.major.name}</Tag>
                </Col>
                <Col className="font-bold" span={10}>
                  Vị trí làm việc
                </Col>
                <Col span={14}>{post?.jobPosition}</Col>
                {post?.createdAt ? (
                  <>
                    <Col className="font-bold" span={10}>
                      Ngày đăng
                    </Col>
                    <Col span={14}>{formatDate(post?.createdAt)}</Col>
                  </>
                ) : (
                  <></>
                )}
                {post?.finishTime ? (
                  <>
                    <Col className="font-bold" span={10}>
                      Hạn chót
                    </Col>
                    <Col span={14}>{formatDate(post?.finishTime)}</Col>
                  </>
                ) : (
                  <></>
                )}
              </Row>
              {post.freelancer && (
                <>
                  <div className="font-bold text-lg mt-8 mb-4">
                    Thông tin Freelancer
                  </div>
                  <Row gutter={[4, 8]} align={"middle"}>
                    <Col className="font-bold" span={6}>
                      <Avatar src={post?.freelancer?.avatar} size={60} />
                    </Col>
                    <Col span={18} className="font-bold">
                      {post?.freelancer?.name}
                    </Col>
                  </Row>
                </>
              )}
              {post.freelancer && post.status === "Accepted" && (
                <Button
                  type="primary"
                  className="w-full mt-8"
                  onClick={() => setShowChat(true)}
                >
                  Mở chat box
                </Button>
              )}
              {/* {post.status !== "Accepted" && (
                <Button
                  disabled
                  className="w-full mt-8"
                  onClick={() => setShowChat(true)}
                >
                  Yêu cầu đã hoàn tất
                </Button>
              )} */}
            </Card>
          </CardSkeleton>
        </Col>
      </Row>
    </div>
  );
}

export default PostDetail;
