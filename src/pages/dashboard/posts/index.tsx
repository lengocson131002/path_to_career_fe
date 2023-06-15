import {
  EnumKeys,
  PostStatus,
  PostStatusColor,
  ServiceTypeColor,
  ServiceTypes,
} from "@/commons/enum";
import { formatDate, timeSince } from "@/commons/utils";
import { AccountModel } from "@/services/accounts/models";
import { PostModel } from "@/services/posts/models";
import { getPosts } from "@/services/posts/services";
import { AppState } from "@/stores";
import { useQuery } from "@tanstack/react-query";
import { Avatar, Input, Space, Switch, Table, Tag, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const columns: ColumnsType<PostModel> = [
  {
    title: "STT",
    key: "index",
    width: "10%",
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
    title: "Người hỗ trợ",
    dataIndex: "freelancer",
    key: "freelancer",
    align: "center",
    render: (freelancer?: AccountModel) =>
      freelancer ? (
        <Tooltip title={freelancer?.name} className="flex">
          <Avatar src={freelancer?.avatar} />
          <span className="ml-4 text-ellipsis overflow-hidden whitespace-nowrap">
            {freelancer?.name}
          </span>
        </Tooltip>
      ) : (
        <div>-</div>
      ),
    ellipsis: true,
  },
  {
    title: "Thời gian tạo",
    dataIndex: "createAt",
    key: "createAt",
    align: "center",
    width: 160,
    render: (_, record) =>
      record.createdAt && (
        <Tooltip title={formatDate(record.createdAt)} placement="bottom">
          <div className="text-p2c-gray">{timeSince(record.createdAt)}</div>
        </Tooltip>
      ),
    ellipsis: true,
  },
];
function Posts() {
  const { account } = useSelector((state: AppState) => state.user);
  const navigate = useNavigate();
  const [isMine, setIsMine] = useState<boolean>(false);
  const [search, setSearch] = useState<string | undefined>();
  const [page, setPage] = useState<number>(1);
  const posts = useQuery([`p2c_posts`], () =>
    getPosts({
      freelancerId: isMine ? account?.id : undefined,
      keyword: search,
      pageNumber: page,
    })
  );

  useEffect(() => {
    posts.refetch();
  }, [isMine, search, page]);

  return (
    <>
      <div className="mb-4">
        <Space direction="horizontal">
          <Input
            placeholder="Tìm kiếm"
            size="large"
            value={search}
            prefix={<BiSearch />}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div>
            <label className="mx-4">Bài đăng đã nhận: </label>
            <Switch
              disabled={account?.role === "Admin"}
              checked={isMine}
              onChange={(checked: boolean) => setIsMine(checked)}
            />
          </div>
        </Space>
      </div>
      <Table
        loading={!posts.data}
        dataSource={posts.data?.items}
        columns={columns}
        pagination={{
          current: posts.data?.pageNumber,
          total: posts.data?.totalCount,
          onChange: (page) => setPage(page),
        }}
        onRow={(data) => {
          return {
            onClick: () => navigate(`/dashboard/posts/${data.id}`),
          };
        }}
        rowClassName={"cursor-pointer"}
      />
    </>
  );
}

export default Posts;
