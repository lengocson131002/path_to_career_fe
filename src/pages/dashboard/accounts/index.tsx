import { Roles, getEnumKeyByValue } from "@/commons/enum";
import { AccountModel } from "@/services/accounts/models";
import { getAccounts } from "@/services/accounts/services";
import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";

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
];
function Accounts() {
  const accounts = useQuery([`p2c_accounts_users`], () =>
    getAccounts({ role: getEnumKeyByValue(Roles, Roles.User) })
  );

  return (
    <Table
      loading={!accounts.data}
      dataSource={accounts.data?.items}
      columns={columns}
      rowClassName={"cursor-pointer"}
    />
  );
}

export default Accounts;
