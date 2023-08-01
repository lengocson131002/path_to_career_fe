import {
  CvStyle,
  CvType,
  EnumKeys,
  JobLevel,
  PaymentMethod,
  ServiceTypes,
  enumToList,
  getEnumKeyByValue,
} from "@/commons/enum";
import CreatePostPageCreateCV from "@/components/create-post/CreatePostPageCreateCV";
import CreatePostPageMockInterview from "@/components/create-post/CreatePostPageMockInterview";
import CreatePostPageReviewCV from "@/components/create-post/CreatePostPageReviewCV";
import PostPayment from "@/components/create-post/PostPayment";
import PostPaymentQR from "@/components/create-post/PostPaymentQR";
import { upload } from "@/services/files/services";
import { CreatePostRequest } from "@/services/posts/requests";
import { createPost, payPost } from "@/services/posts/services";
import { HomeOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { Breadcrumb, Col, Row, Steps, Tabs, message } from "antd";
import { RcFile, UploadFile } from "antd/es/upload";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { HiOutlineDocumentText } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";

export interface CreatePostForm {
  title: string;
  jobPosition: string;
  jobLevel: JobLevel;
  finishTime: dayjs.Dayjs;
  content: string;
  description?: string;
  supportCount?: number;
  mediaUrl: string;
  cvStyle: CvStyle;
  cvType: CvType;
  majorCode: string;
}

export interface PaymentInfo {
  amount: number;
  content: string;
}

function CreatePostPage() {
  const [service, setService] = useState<ServiceTypes>(ServiceTypes.ReviewCV);
  const [fileUrl, setFileUrl] = useState<string>();
  const [step, setStep] = useState(0);
  const [postId, setPostId] = useState<number>();
  const [file, setFile] = useState<UploadFile>();
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>();
  const [paymentMethod, setPaymentMethod] =
    useState<EnumKeys<typeof PaymentMethod>>("Banking");
  const navigate = useNavigate();

  const { data, isSuccess, mutate } = useMutation((data: CreatePostRequest) =>
    createPost(data)
  );

  const payment = useMutation(
    ({
      postId,
      method,
    }: {
      postId: number;
      method: EnumKeys<typeof PaymentMethod>;
    }) => payPost(postId, method)
  );
  const fileMutation = useMutation((file: RcFile) => upload(file));

  const handleUpload = (fileUpload: UploadFile) => {
    const isAccepted =
      fileUpload.type === "image/jpeg" ||
      fileUpload.type === "image/png" ||
      fileUpload.type === "application/pdf";
    if (!isAccepted) {
      message.error("Chỉ hỗ trợ định dạng JPG/PNG/PDF!");
    } else {
      setFile(fileUpload);
      fileMutation.mutate(fileUpload as RcFile);
    }
    return false;
  };

  useEffect(() => {
    if (fileMutation.isSuccess) {
      message.success("Upload thành công!");
      setFileUrl(fileMutation.data?.url);
    }
  }, [fileMutation.isSuccess]);

  const onFinish = (form: CreatePostForm) => {
    const serviceType = getEnumKeyByValue(ServiceTypes, service);
    if (serviceType) {
      mutate({
        content: form.content,
        cvStyle: form.cvStyle,
        cvType: form.cvType,
        finishTime: form.finishTime?.toISOString(),
        jobLevel: getEnumKeyByValue(JobLevel, form.jobLevel),
        jobPosition: form.jobPosition,
        majorCode: form.majorCode,
        mediaUrl: fileUrl,
        serviceType: getEnumKeyByValue(ServiceTypes, service),
        supportCount: form.supportCount ? +form.supportCount : undefined,
        title: form.title,
        description: form.description,
      });
    }
  };

  useEffect(() => {
    if (isSuccess && data.status === "Paid") {
      message.success("Tạo bài đăng thành công.");
      navigate("/bai-dang");
    } else if (isSuccess) {
      setPostId(data.id);
      setStep(step + 1);
    }
  }, [isSuccess]);

  useEffect(() => {
    setFile(undefined);
  }, [service]);

  const handlePay = ({
    method,
  }: {
    method: EnumKeys<typeof PaymentMethod>;
  }) => {
    if (postId) {
      payment.mutate({ postId: postId, method: method });
      setPaymentMethod(method);
    }
  };

  useEffect(() => {
    if (payment.isSuccess) {
      message.success("Chọn phương thức thành công.");
      setPaymentInfo({
        amount: payment.data.amount,
        content: payment.data.content,
      });
      setStep(step + 1);
    }
  }, [payment.isSuccess]);

  return (
    <Row gutter={[60, 24]}>
      <Col span={6}></Col>
      <Col span={18}>
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
      <Col span={6}>
        <Tabs
          className="sticky float-right"
          defaultActiveKey="1"
          tabPosition={"left"}
          size="large"
          items={enumToList(ServiceTypes)}
          onChange={(activeKey) =>
            setService(ServiceTypes[activeKey as keyof typeof ServiceTypes])
          }
        />
      </Col>
      <Col span={12}>
        {(() => {
          switch (step) {
            case 0:
              return (() => {
                switch (service) {
                  case ServiceTypes.ReviewCV:
                    return (
                      <CreatePostPageReviewCV
                        onFinish={onFinish}
                        file={file}
                        setFile={setFile}
                        onUpload={handleUpload}
                        fileUrl={fileUrl}
                      />
                    );
                  case ServiceTypes.CreateCV:
                    return (
                      <CreatePostPageCreateCV
                        onFinish={onFinish}
                        file={file}
                        setFile={setFile}
                        onUpload={handleUpload}
                        fileUrl={fileUrl}
                      />
                    );
                  case ServiceTypes.MockInterview:
                    return (
                      <CreatePostPageMockInterview
                        onFinish={onFinish}
                        file={file}
                        setFile={setFile}
                        onUpload={handleUpload}
                        fileUrl={fileUrl}
                      />
                    );
                }
              })();
            case 1:
              return <PostPayment onSubmit={handlePay} />;
            case 2:
              return (
                <PostPaymentQR type={paymentMethod} paymentInfo={paymentInfo} />
              );
          }
        })()}
      </Col>
      <Col span={6}>
        <Steps
          direction="vertical"
          current={step}
          className="h-52"
          items={[
            { title: "Tạo bài đăng" },
            {
              title: "Chọn phương thức",
            },
            {
              title: "Thanh toán",
            },
          ]}
        />
      </Col>
    </Row>
  );
}

export default CreatePostPage;
