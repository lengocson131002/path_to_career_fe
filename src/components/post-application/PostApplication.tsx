import { CreatePostApplicationRequest } from "@/services/post-applications/requests";
import { createPostApplication } from "@/services/post-applications/services";
import { useMutation } from "@tanstack/react-query";
import { Button, Card, Col, Form, InputNumber, Row, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";

interface PostApplicationForm {
  supportCount?: string;
  feePerCount?: string;
  experienceDescription?: string;
  methodDescription?: string;
}
function PostApplication({ postId }: { postId: string }) {
  const postApplicationMutation = useMutation(
    (request: CreatePostApplicationRequest) =>
      createPostApplication(postId, request)
  );

  const handleApplyPost = (data: PostApplicationForm) => {
    postApplicationMutation.mutate({
      experienceDescription: data.experienceDescription,
      feePerCount: data.feePerCount ? +data.feePerCount : undefined,
      methodDescription: data.methodDescription,
      supportCount: data.supportCount ? +data.supportCount : undefined,
    });
  };

  useEffect(() => {
    if (postApplicationMutation.isSuccess) {
      message.success("Gửi yêu thành công");
    }
  }, [postApplicationMutation.isSuccess]);

  return (
    <Card title="Gửi yêu cầu nhận việc" className="bg-light-blue mt-8">
      <Form layout="vertical" onFinish={handleApplyPost}>
        <Row gutter={24}>
          <Col span={11}>
            <div className="font-semibold mb-4">Thông tin hỗ trợ</div>
            <Form.Item
              name="supportCount"
              rules={[
                { required: true, message: "Vui lòng nhập số lần hỗ trợ" },
              ]}
            >
              <Row gutter={4} align={"middle"} className="mt-2">
                <Col span={6}>
                  <label>Số lần hỗ trợ:</label>
                </Col>
                <Col>
                  <InputNumber placeholder="0" min={0} />
                </Col>
                <Col>lần</Col>
              </Row>
            </Form.Item>
            <Form.Item
              name="feePerCount"
              rules={[{ required: true, message: "Vui lòng nhập chi phí" }]}
            >
              <Row gutter={4} align={"middle"} className="mt-4">
                <Col span={6}>
                  <label>Chi phí:</label>
                </Col>
                <Col>
                  <InputNumber placeholder="10000" min={1000} />
                </Col>
                <Col>VNĐ / 1 lần hỗ trợ</Col>
              </Row>
            </Form.Item>
          </Col>
          <Col span={13}>
            <div className="font-semibold mb-4">
              Đề xuất thuyết phục khách hàng
            </div>
            <Form.Item
              className="mt-4"
              name="experienceDescription"
              label={
                <label>
                  1. Bạn có kinh nghiệm gì phù hợp với yêu cầu của khách hàng?
                </label>
              }
              rules={[{ required: true, message: "Vui lòng nhập kinh nghiệm" }]}
            >
              <TextArea />
            </Form.Item>
            <Form.Item
              className="mt-8"
              name="methodDescription"
              label={
                <label>2. Bạn hãy mô tả cách thức thực hiện công việc?</label>
              }
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập cách thức thực hiện",
                },
              ]}
            >
              <TextArea />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary" className="w-full mt-8">
                Gửi thông tin đến khách hàng
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}

export default PostApplication;
