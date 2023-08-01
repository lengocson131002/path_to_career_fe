import {
  PostStatus,
  PostStatusButton,
  PostStatusColor,
  ServiceTypes,
} from "@/commons/enum";
import { formatDate } from "@/commons/utils";
import CardSkeleton from "@/components/core/CardSkeleton";
import { PostDetailModel } from "@/services/posts/models";
import { SendReviewRequest } from "@/services/reviews/requests";
import { sendReview, updateReview } from "@/services/reviews/services";
import { useMutation } from "@tanstack/react-query";
import {
  Avatar,
  Button,
  Card,
  Col,
  Rate,
  Row,
  Skeleton,
  Tag,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import HTMLReactParser from "html-react-parser";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { AiFillStar } from "react-icons/ai";
import { IoDocumentText } from "react-icons/io5";
interface ReviewForm {
  score: number;
  content?: string;
}

function PostDetail({
  post,
  setShowChat,
  isLoading,
  refetch,
}: {
  post: PostDetailModel;
  setShowChat: Dispatch<SetStateAction<boolean>>;
  isLoading?: boolean;
  refetch: () => void;
}) {
  const [review, setReview] = useState<ReviewForm>({
    score: post.review?.score ?? 3,
    content: post.review?.content,
  });
  const sendReviewMutation = useMutation((review: SendReviewRequest) =>
    sendReview(review)
  );
  const updateReviewMutation = useMutation(
    (review: Pick<SendReviewRequest, "content" | "score">) =>
      updateReview({
        id: post.review?.id ?? 0,
        request: review,
      })
  );

  useEffect(() => {
    refetch();
    if (sendReviewMutation.isSuccess) {
      message.success("Đánh giá thành công");
    }
    if (updateReviewMutation.isSuccess) {
      message.success("Cập nhật đánh giá thành công");
    }
  }, [sendReviewMutation.isSuccess, updateReviewMutation.isSuccess]);

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
              {post.freelancer &&
                (post.status === "Accepted" || post.status === "Done") && (
                  <Button
                    type="primary"
                    className="w-full mt-8"
                    onClick={() => setShowChat(true)}
                  >
                    Mở chat box
                  </Button>
                )}
              {post.status !== "Accepted" && post.status !== "Done" && (
                <Button
                  disabled
                  className="w-full mt-8"
                  onClick={() => setShowChat(true)}
                >
                  {PostStatusButton[post.status]}
                </Button>
              )}
            </Card>
          </CardSkeleton>{" "}
          {post.status === "Accepted" ||
            (post.status === "Done" && (
              <CardSkeleton className="h-fit mt-4">
                <Card>
                  <div className="font-bold text-lg mb-2">
                    Đánh giá Freelancer
                  </div>
                  <div>
                    <Rate
                      character={<AiFillStar className={"text-2xl"} />}
                      className="my-2"
                      value={review.score}
                      onChange={(value) =>
                        setReview((prev) => ({ ...prev, score: value }))
                      }
                    />
                    <TextArea
                      placeholder="Nhập nội dung đánh giá"
                      value={review.content}
                      onChange={(value) =>
                        setReview((prev) => ({
                          ...prev,
                          content: value.target.value,
                        }))
                      }
                    />
                    <Button
                      type="primary"
                      className="w-full mt-4"
                      onClick={() => {
                        if (!post.review) {
                          sendReviewMutation.mutate({
                            postId: post.id,
                            content: review.content,
                            score: review.score,
                          });
                        } else {
                          updateReviewMutation.mutate({
                            content: review.content,
                            score: review.score,
                          });
                        }
                      }}
                    >
                      Đánh giá Freelancer
                    </Button>
                  </div>
                </Card>
              </CardSkeleton>
            ))}
        </Col>
      </Row>
    </div>
  );
}

export default PostDetail;
