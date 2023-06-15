import {
  EnumKeys,
  PaymentMethod,
  PaymentMethodColor,
  TransactionStatus,
  TransactionStatusColor,
} from "@/commons/enum";
import { formatCurrency, formatDate, timeSince } from "@/commons/utils";
import { TransactionModel } from "@/services/transactions/models";
import { getTransactions } from "@/services/transactions/services";
import { useQuery } from "@tanstack/react-query";
import { Table, Tag, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";

const columns: ColumnsType<TransactionModel> = [
  {
    title: "STT",
    key: "index",
    width: "10%",
    ellipsis: true,
    align: "center",
    render: (_, record, index) => <>{index + 1}</>,
  },
  {
    title: "Số tiền",
    dataIndex: "amount",
    align: "center",
    ellipsis: true,
    key: "amount",
    render: (amount) => formatCurrency(amount),
  },
  {
    title: "Phương thức",
    dataIndex: "payMethod",
    key: "payMethod",
    ellipsis: true,
    align: "center",
    render: (payMethod: EnumKeys<typeof PaymentMethod>) => (
      <Tag color={PaymentMethodColor[payMethod]}>
        {PaymentMethod[payMethod]}
      </Tag>
    ),
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    ellipsis: true,
    key: "status",
    align: "center",
    render: (status: EnumKeys<typeof TransactionStatus>) => (
      <Tag color={TransactionStatusColor[status]}>
        {TransactionStatus[status]}
      </Tag>
    ),
  },
  {
    title: "Thời gian tạo",
    dataIndex: "createAt",
    key: "createAt",
    ellipsis: true,
    align: "center",
    width: 160,
    render: (_, record) =>
      record.createdAt && (
        <Tooltip title={formatDate(record.createdAt)} placement="bottom">
          <div className="text-p2c-gray">{timeSince(record.createdAt)}</div>
        </Tooltip>
      ),
  },
];
function Transactions() {
  const transactions = useQuery([`p2c_transactions`], () => getTransactions());
  const navigate = useNavigate();

  return (
    <Table
      loading={!transactions.data}
      dataSource={transactions.data?.items}
      columns={columns}
      onRow={(data) => {
        return {
          onClick: () => navigate(`/dashboard/transactions/${data.id}`),
        };
      }}
      rowClassName={"cursor-pointer"}
    />
  );
}

export default Transactions;
