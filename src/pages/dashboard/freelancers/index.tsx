import { Roles, getEnumKeyByValue } from "@/commons/enum";
import { AccountModel } from "@/services/accounts/models";
import { acceptFreelancer, getAccounts } from "@/services/accounts/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Popconfirm, Table, Tag, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect } from "react";

function Freelancers() {
  const accounts = useQuery([`p2c_accounts_freelancer`], () =>
    getAccounts({ role: getEnumKeyByValue(Roles, Roles.Freelancer) })
  );
  const acceptFreelancerMutation = useMutation((id: number) =>
    acceptFreelancer(id)
  );
  const queryClient = useQueryClient();

  useEffect(() => {
    if (acceptFreelancerMutation.isSuccess) {
      message.success("Duyệt freelancer thành công");
      queryClient.invalidateQueries(["p2c_accounts_freelancer"]);
    }
  }, [acceptFreelancerMutation.isSuccess]);

  const columns: ColumnsType<AccountModel> = [
    {
      title: "STT",
      key: "index",
      align: "center",
      ellipsis: true,
      render: (_, record, index) => <>{index + 1}</>,
    },
    {
      title: "Họ và tên",
      dataIndex: "title",
      key: "title",
      ellipsis: true,
      render: (_, record) => <b>{record.name}</b>,
    },
    {
      title: "Email",
      dataIndex: "email",
      ellipsis: true,
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      ellipsis: true,
      key: "phone",
    },
    {
      title: "Trạng thái",
      key: "status",
      align: "center",
      render: (_, record) =>
        record.isAccepted ? (
          <Tag color="green">Đã duyệt</Tag>
        ) : (
          <Tag color="red">Chưa duyệt</Tag>
        ),
      ellipsis: true,
    },
    {
      title: "Thao tác",
      key: "actions",
      align: "center",
      render: (_, record) =>
        !record.isAccepted ? (
          <Popconfirm
            title="Duyệt freelancer"
            description="Bạn có chắc sẽ duyệt Freelancer này chứ?"
            placement="bottomRight"
            onConfirm={() => {
              acceptFreelancerMutation.mutate(record.id);
            }}
            okText="Duyệt"
            cancelText="Hủy"
          >
            <Button type="default">Duyệt freelancer</Button>
          </Popconfirm>
        ) : (
          <></>
        ),
    },
  ];
  return (
    <Table
      loading={!accounts.data}
      dataSource={accounts.data?.items}
      columns={columns}
      rowClassName={"cursor-pointer"}
    />
  );
}

export default Freelancers;
