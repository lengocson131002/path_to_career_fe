import { formatDate } from "@/commons/utils";
import AccountInformationCard from "@/components/account/AccountInformationCard";
import CardSkeleton from "@/components/core/CardSkeleton";
import { getAccount } from "@/services/accounts/services";
import { SendReviewRequest } from "@/services/reviews/requests";
import { getReviews, sendReview } from "@/services/reviews/services";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Avatar,
  Button,
  Card,
  Col,
  Empty,
  Form,
  List,
  Modal,
  Rate,
  Row,
  Tag,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { BsFillStarFill } from "react-icons/bs";
import { useParams } from "react-router-dom";

interface SendReviewForm {
  id?: number;
  score?: number;
  content?: string;
}

const AccountDetail = () => {
  const { id } = useParams();
  const account = useQuery([`p2c_account_${id}`], () => getAccount(id));
  const reviews = useQuery([`p2c_reviews_account_${id}`], () =>
    getReviews({ accountId: id ? +id : undefined })
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<SendReviewForm>({
    id: id ? +id : undefined,
    score: 3,
  });

  const [form] = Form.useForm();
  const { isSuccess, mutate, isLoading } = useMutation(
    (data: SendReviewRequest) => sendReview(data)
  );

  const handleSendReview = async () => {
    mutate({
      accountId: formData.id,
      content: formData.content,
      score: formData.score,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setIsModalOpen(false);
      message.success("Đánh giá thành công");
    }
  }, [isSuccess]);

  return (
    <div className="flex w-ful">
      <Row className="w-full px-20">
        <Col span={16}>
          <Row gutter={[20, 0]}>
            <Col span={6}>
              <div className="w-full flex justify-center">
                <Avatar size={160} src={account.data?.avatar}>
                  {account.data?.email}
                </Avatar>
              </div>
            </Col>
            <Col span={18}>
              <div className="font-bold text-2xl">{account.data?.name}</div>
              <div className="text-p2c-gray mt-2 mb-4">
                {account.data?.description}
              </div>
              <div className="">
                {account.data?.majors?.map((major, index) => (
                  <Tag color="green" key={index}>
                    {major.name}
                  </Tag>
                ))}
              </div>

              <div className="font-bold text-xl mt-16">Giới thiệu</div>
              <ul>
                <li>Sinh viên năm 3 đại học FPT HCM</li>
                <li>Chuyên môn về vị trí Back-end</li>
              </ul>
              <div className="font-bold text-xl mt-6">Dịch vụ</div>
              <ul>
                <li>Phát triển ứng dụng web</li>
                <li>Chuyên môn về vị trí Back-end</li>
              </ul>
            </Col>
          </Row>
        </Col>
        <Col span={8}>
          <AccountInformationCard loading={loading} user={account.data} />
          <CardSkeleton
            className="my-4"
            loading={!reviews || reviews.isFetching}
          >
            <Card>
              <List
                dataSource={reviews.data?.items}
                renderItem={(item) => (
                  <List.Item>
                    <div className="w-full">
                      <div className="flex justify-between w-full">
                        <div className="font-semibold">
                          {item.reviewer.fullName}
                        </div>
                        <div className="text-p2c-gray">
                          {formatDate(item.createdAt)}
                        </div>
                      </div>
                      <Rate value={item.score} disabled />
                      <div className="w-full break-words">{item.content}</div>
                    </div>
                  </List.Item>
                )}
                locale={{
                  emptyText: (
                    <Empty
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      description={<span>Hiện chưa có đánh giá nào</span>}
                    />
                  ),
                }}
              />
            </Card>
          </CardSkeleton>
          <Button
            type="primary"
            className="w-full"
            onClick={() => setIsModalOpen(true)}
          >
            Đánh giá người dùng
          </Button>
          <Modal
            title="Đánh giá người dùng"
            open={isModalOpen}
            okText="Gửi đánh giá"
            cancelText="Hủy"
            onOk={form.submit}
            confirmLoading={isLoading}
            onCancel={() => setIsModalOpen(false)}
          >
            <Form
              form={form}
              onFinish={handleSendReview}
              layout="vertical"
              name="basic"
              autoComplete="off"
            >
              <Rate
                value={formData.score}
                character={<BsFillStarFill className="text-3xl my-4" />}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, score: value }))
                }
              />
              <Form.Item
                name={"content"}
                rules={[
                  {
                    required: true,
                    message:
                      "Hãy cho chúng tôi biết thêm về trải nghiệm của bạn",
                  },
                ]}
              >
                <TextArea
                  placeholder="Hãy cho chúng tôi biết thêm về trải nghiệm của bạn."
                  rows={4}
                  className="h-4"
                  style={{ resize: "none" }}
                  onChange={({ target }) =>
                    setFormData((prev) => ({ ...prev, content: target.value }))
                  }
                />
              </Form.Item>
            </Form>
          </Modal>
        </Col>
      </Row>
    </div>
  );
};

export default AccountDetail;
