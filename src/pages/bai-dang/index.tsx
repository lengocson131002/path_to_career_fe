import {
  EnumKeys,
  PostStatus,
  PostStatusColor,
  ServiceTypeColor,
  ServiceTypes,
  enumToList,
} from "@/commons/enum";
import { timeSince } from "@/commons/utils";
import CardSkeleton from "@/components/core/CardSkeleton";
import { getMajorCodes } from "@/services/majors/services";
import { PostModel } from "@/services/posts/models";
import { getPosts } from "@/services/posts/services";
import { AppState } from "@/stores";
import { useQuery } from "@tanstack/react-query";
import { Button, Card, Checkbox, Col, Radio, Row, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const columns: ColumnsType<PostModel> = [
  {
    title: "STT",
    key: "index",
    align: "center",
    render: (_, record, index) => <>{index + 1}</>,
    ellipsis: true,
  },
  {
    title: "Tiêu đề",
    dataIndex: "title",
    key: "title",
    width: "30%",
    ellipsis: true,
    render: (_, record) => <b>{record.title}</b>,
  },
  {
    title: "Dịch vụ",
    dataIndex: "serviceType",
    align: "center",
    key: "serviceType",
    render: (serviceType: EnumKeys<typeof ServiceTypes>) => (
      <Tag color={ServiceTypeColor[serviceType]}>
        {ServiceTypes[serviceType]}
      </Tag>
    ),
    ellipsis: true,
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    align: "center",
    render: (status: EnumKeys<typeof PostStatus>) => (
      <Tag color={PostStatusColor[status]}>{PostStatus[status]}</Tag>
    ),
    ellipsis: true,
  },
  {
    title: "Thời gian tạo",
    dataIndex: "createAt",
    key: "createAt",
    align: "center",
    width: 160,
    render: (_, record) => (
      <div className="text-p2c-gray">
        {record.createdAt && timeSince(record.createdAt)}
      </div>
    ),
    ellipsis: true,
  },
  {
    title: "Thao tác",
    key: "actions",
    align: "center",
    render: (_, record) => (
      <Link to={`/bai-dang/${record.id}`}>
        <Button type="default">Chi tiết</Button>
      </Link>
    ),
    ellipsis: true,
  },
];
function PostPage() {
  const { account } = useSelector((state: AppState) => state.user);
  const majors = useQuery(["p2c_majors"], getMajorCodes);
  const [page, setPage] = useState<number>(1);
  const [majorIds, setMajorIds] = useState<number[]>([]);
  const [serviceType, setServiceType] =
    useState<EnumKeys<typeof ServiceTypes>>();

  const posts = useQuery([`p2c_posts_account_${account?.id}`], () =>
    getPosts({
      id: account?.id,
      pageNumber: page,
      majorIds: majorIds,
      serviceType: serviceType,
    })
  );

  useEffect(() => {
    posts.refetch();
  }, [page, majorIds, serviceType]);

  return (
    <Row gutter={24}>
      <Col span={5}>
        <CardSkeleton
          loading={majors.isFetching}
          className="w-full sticky top-28"
        >
          <Card className="w-full sticky top-28">
            <div className="text-primary font-semibold mb-2">Dịch vụ</div>
            <div className="ml-4">
              <Radio.Group
                className="flex-col flex"
                onChange={(e) => setServiceType(e.target.value)}
                options={enumToList(ServiceTypes)}
                value={serviceType}
              ></Radio.Group>
            </div>
            <div className="text-primary font-semibold my-2">Lĩnh vực</div>
            <div className="ml-4">
              <Checkbox.Group
                onChange={(checkedValue) =>
                  setMajorIds(checkedValue.map((check) => +check))
                }
                className="flex-col flex"
                options={majors.data?.map((major) => ({
                  label: major.name,
                  value: major.id,
                }))}
                value={majorIds}
              />
            </div>
            <Button
              className="w-full mt-2"
              type="default"
              size="small"
              onClick={() => {
                setMajorIds([]);
                setServiceType(undefined);
              }}
            >
              Xóa bộ lọc
            </Button>
          </Card>
        </CardSkeleton>
      </Col>
      <Col span={19}>
        <Table
          loading={!posts.data}
          dataSource={posts.data?.items}
          columns={columns}
          pagination={{
            current: posts.data?.pageNumber,
            total: posts.data?.totalCount,
            onChange: (page) => setPage(page),
          }}
          rowClassName={"cursor-pointer"}
        />
      </Col>
    </Row>
  );
}

export default PostPage;
