import {
  CvStyle,
  CvType,
  JobLevel,
  ServiceTypes,
  enumToList,
  getEnumKeyByValue,
} from "@/commons/enum";
import CreatePostPageCreateCV from "@/components/create-post/CreatePostPageCreateCV";
import CreatePostPageMockInterview from "@/components/create-post/CreatePostPageMockInterview";
import CreatePostPageReviewCV from "@/components/create-post/CreatePostPageReviewCV";
import { upload } from "@/services/files/services";
import { CreatePostRequest } from "@/services/posts/requests";
import { createPost } from "@/services/posts/services";
import { HomeOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { Breadcrumb, Col, Row, Tabs, message } from "antd";
import { RcFile, UploadFile } from "antd/es/upload";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { HiOutlineDocumentText } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";

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
function CreatePostPage() {
  const [service, setService] = useState<ServiceTypes>(ServiceTypes.ReviewCV);
  const [fileUrl, setFileUrl] = useState<string>();
  const [file, setFile] = useState<UploadFile>();
  const navigate = useNavigate();

  const { isSuccess, mutate } = useMutation((data: CreatePostRequest) =>
    createPost(data)
  );
  const fileMutation = useMutation((file: RcFile) => upload(file));

  const handleUpload = (fileUpload: UploadFile) => {
    setFile(fileUpload);
    fileMutation.mutate(fileUpload as RcFile);
  };

  useEffect(() => {
    if (fileMutation.isSuccess) {
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
        supportCount: form.supportCount,
        title: form.title,
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      message.success("Tạo bài đăng thành công.");
      navigate("/quan-ly-bai-dang");
    }
  }, [isSuccess]);

  useEffect(() => {
    setFile(undefined);
  }, [service]);

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
      <Col span={8}>
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
      <Col span={16}>
        {(() => {
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
        })()}
      </Col>
    </Row>
  );
}

export default CreatePostPage;
