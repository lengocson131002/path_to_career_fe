import {
  CvStyle,
  CvType,
  PostStatus,
  PostStatusColor,
  ServiceTypeColor,
  ServiceTypes,
} from "@/commons/enum";
import { formatDate } from "@/commons/utils";
import {
  acceptPost,
  completePost,
  getPostDetail,
} from "@/services/posts/services";
import { AppState } from "@/stores";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Card, Descriptions, Tag, message } from "antd";
import HTMLReactParser from "html-react-parser";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

function Posts() {
  const { id } = useParams();
  const { account } = useSelector((state: AppState) => state.user);

  const postDetail = useQuery([`p2c_post_${id}`], () => {
    if (id) {
      return getPostDetail(id);
    }
  });

  const queryClient = useQueryClient();
  const acceptPostMutation = useMutation((id: string) => acceptPost(id));
  const completePostMutation = useMutation((id: string) => completePost(id));

  const handleAcceptPost = () => {
    if (id) {
      acceptPostMutation.mutate(id);
    }
  };

  const handleCompletePost = () => {
    if (id) {
      completePostMutation.mutate(id);
    }
  };
  useEffect(() => {
    if (acceptPostMutation.isSuccess) {
      message.success("Nhận yêu cầu thành công!");
      queryClient.invalidateQueries([`p2c_post_${id}`]);
    }
    if (completePostMutation.isSuccess) {
      message.success("Hoàn tất yêu cầu thành công!");
      queryClient.invalidateQueries([`p2c_post_${id}`]);
    }
  }, [acceptPostMutation.isSuccess, completePostMutation.isSuccess]);

  return (
    postDetail.data && (
      <Card>
        <Descriptions
          layout="horizontal"
          title={
            <>
              Thông tin yêu cầu
              <span className="ml-4">
                <Tag color={PostStatusColor[postDetail.data.status]}>
                  {PostStatus[postDetail.data.status]}
                </Tag>
              </span>
            </>
          }
          column={3}
          size="small"
          bordered
        >
          <Descriptions.Item label="Mã yêu cầu">
            {postDetail.data.id}
          </Descriptions.Item>
          <Descriptions.Item label="Dịch vụ">
            <Tag color={ServiceTypeColor[postDetail.data.serviceType]}>
              {ServiceTypes[postDetail.data.serviceType]}
            </Tag>
          </Descriptions.Item>
          {postDetail.data.createdAt && (
            <Descriptions.Item label="Thời gian tạo">
              {formatDate(postDetail.data.createdAt)}
            </Descriptions.Item>
          )}
          <Descriptions.Item label="Lĩnh vực">
            {postDetail.data.major.name}
          </Descriptions.Item>
          <Descriptions.Item label="Vị trí">
            {postDetail.data.jobPosition}
          </Descriptions.Item>
          {postDetail.data.finishTime && (
            <Descriptions.Item label="Hạn chót">
              {formatDate(postDetail.data.finishTime)}
            </Descriptions.Item>
          )}
          {postDetail.data.cvStyle && (
            <Descriptions.Item label="Hình thức CV">
              <Tag color="volcano">{CvStyle[postDetail.data.cvStyle]}</Tag>
            </Descriptions.Item>
          )}
          {postDetail.data.cvType && (
            <Descriptions.Item label="Loại CV">
              <Tag color="volcano">{CvType[postDetail.data.cvType]}</Tag>
            </Descriptions.Item>
          )}
          {postDetail.data.supportCount && (
            <Descriptions.Item label="Lượt hỗ trợ">
              <div>{postDetail.data.supportCount}</div>
            </Descriptions.Item>
          )}
          {postDetail.data.account && (
            <Descriptions.Item label="Họ tên người yêu cầu">
              {postDetail.data.account.name}
            </Descriptions.Item>
          )}
          {postDetail.data.account && (
            <Descriptions.Item label="Email người yêu cầu">
              {postDetail.data.account.email}
            </Descriptions.Item>
          )}
          {postDetail.data.account?.phone && (
            <Descriptions.Item label="Số điện thoại người yêu cầu">
              {postDetail.data.account.phone}
            </Descriptions.Item>
          )}
          {postDetail.data.mediaUrl && (
            <Descriptions.Item label="Liên kết phương tiện" span={3}>
              <Link
                className="text-primary"
                to={postDetail.data.mediaUrl}
                target="_blank"
                rel="noreferrer"
              >
                Xem phương tiện
              </Link>
            </Descriptions.Item>
          )}
          <Descriptions.Item label="Nội dung yêu cầu" span={3}>
            <div className="mt-4 font-semibold">
              Tiêu đề: {postDetail.data.title}
            </div>
            <div>{HTMLReactParser(postDetail.data.content)}</div>
          </Descriptions.Item>
          {postDetail.data.description && (
            <Descriptions.Item label="Mô tả" span={3}>
              <div>{HTMLReactParser(postDetail.data.description)}</div>
            </Descriptions.Item>
          )}
        </Descriptions>
        {account?.role === "Freelancer" &&
          postDetail.data.status === "Paid" && (
            <Button
              type="primary"
              className="mt-4 float-right"
              onClick={handleAcceptPost}
            >
              Nhận bài đăng
            </Button>
          )}
        {postDetail.data.status === "Accepted" &&
          postDetail.data.freelancer?.id === account?.id && (
            <div className="float-right flex gap-4 mt-4">
              <Link to={`/dashboard/posts/${postDetail.data.id}/messages`}>
                <Button type="default">Liên hệ</Button>
              </Link>
              <Button onClick={handleCompletePost} type="primary">
                Hoàn tất
              </Button>
            </div>
          )}

        {account?.role === "Admin" && (
          <div className="float-right flex gap-4 mt-4">
            <Link to={`/dashboard/posts/${postDetail.data.id}/messages`}>
              <Button type="default">Xem tin nhắn</Button>
            </Link>
          </div>
        )}
      </Card>
    )
  );
}

export default Posts;