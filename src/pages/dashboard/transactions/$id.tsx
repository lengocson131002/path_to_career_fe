import {
  CvStyle,
  CvType,
  PaymentMethodColor,
  ServiceTypeColor,
  ServiceTypes,
  TransactionStatus,
  TransactionStatusColor,
} from "@/commons/enum";
import { formatCurrency, formatDate } from "@/commons/utils";
import {
  cancelTransaction,
  confirmTransaction,
  getTransactionDetail,
} from "@/services/transactions/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Card, Descriptions, Tag, message } from "antd";
import HTMLReactParser from "html-react-parser";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";

function TransactionDetail() {
  const { id } = useParams();
  const confirm = useMutation((id: string) => confirmTransaction(id));
  const cancel = useMutation((id: string) => cancelTransaction(id));
  const queryClient = useQueryClient();

  const transactionDetail = useQuery([`p2c_transaction_${id}`], () => {
    if (id) {
      return getTransactionDetail(id);
    }
  });

  const handleConfirm = () => {
    if (id) {
      confirm.mutate(id);
    }
  };

  const handelCancel = () => {
    if (id) {
      cancel.mutate(id);
    }
  };

  useEffect(() => {
    if (confirm.isSuccess) {
      message.success("Xác nhận giao dịch thành công");
    }
    if (cancel.isSuccess) {
      message.success("Từ chối giao dịch thành công");
    }
    if (confirm.isSuccess || cancel.isSuccess) {
      queryClient.invalidateQueries([`p2c_transaction_${id}`]);
    }
  }, [confirm.isSuccess, cancel.isSuccess]);

  return (
    transactionDetail.data && (
      <Card>
        <Descriptions
          layout="horizontal"
          title={
            <>
              Thông tin giao dịch
              <span className="ml-4">
                <Tag
                  color={TransactionStatusColor[transactionDetail.data.status]}
                >
                  {TransactionStatus[transactionDetail.data.status]}
                </Tag>
              </span>
            </>
          }
          column={3}
          size="small"
          bordered
          extra={
            transactionDetail.data.status === "New" ? (
              <>
                <Button danger className="mr-4" onClick={handelCancel}>
                  Từ chối
                </Button>
                <Button type="primary" onClick={handleConfirm}>
                  Xác nhận
                </Button>
              </>
            ) : (
              <></>
            )
          }
        >
          <Descriptions.Item label="Mã giao dịch">
            {transactionDetail.data.id}
          </Descriptions.Item>
          <Descriptions.Item label="Số tiền">
            {formatCurrency(transactionDetail.data.amount)}
          </Descriptions.Item>
          <Descriptions.Item label="Phương thức thanh toán">
            <Tag color={PaymentMethodColor[transactionDetail.data.payMethod]}>
              {transactionDetail.data.payMethod}
            </Tag>
          </Descriptions.Item>
          {transactionDetail.data.account && (
            <Descriptions.Item label="Mã khách hàng">
              {transactionDetail.data.account.id}
            </Descriptions.Item>
          )}
          {transactionDetail.data.account && (
            <Descriptions.Item label="Tên khách hàng">
              {transactionDetail.data.account.name}
            </Descriptions.Item>
          )}
          {transactionDetail.data.account && (
            <Descriptions.Item label="Số điện thoại khách hàng">
              {transactionDetail.data.account.phone}
            </Descriptions.Item>
          )}

          {transactionDetail.data.post && (
            <>
              <Descriptions.Item label="Mã yêu cầu">
                {transactionDetail.data.post.id}
              </Descriptions.Item>
              <Descriptions.Item label="Dịch vụ">
                <Tag
                  color={
                    ServiceTypeColor[transactionDetail.data.post.serviceType]
                  }
                >
                  {ServiceTypes[transactionDetail.data.post.serviceType]}
                </Tag>
              </Descriptions.Item>
              {transactionDetail.data.post.createdAt && (
                <Descriptions.Item label="Thời gian tạo">
                  {formatDate(transactionDetail.data.post.createdAt)}
                </Descriptions.Item>
              )}
              {transactionDetail.data.post.major && (
                <Descriptions.Item label="Lĩnh vực">
                  {transactionDetail.data.post.major.name}
                </Descriptions.Item>
              )}
              <Descriptions.Item label="Vị trí">
                {transactionDetail.data.post.jobPosition}
              </Descriptions.Item>
              {transactionDetail.data.post.finishTime && (
                <Descriptions.Item label="Hạn chót">
                  {formatDate(transactionDetail.data.post.finishTime)}
                </Descriptions.Item>
              )}
              {transactionDetail.data.post.cvStyle && (
                <Descriptions.Item label="Hình thức CV">
                  <Tag color="volcano">
                    {CvStyle[transactionDetail.data.post.cvStyle]}
                  </Tag>
                </Descriptions.Item>
              )}
              {transactionDetail.data.post.cvType && (
                <Descriptions.Item label="Loại CV">
                  <Tag color="volcano">
                    {CvType[transactionDetail.data.post.cvType]}
                  </Tag>
                </Descriptions.Item>
              )}
              {transactionDetail.data.post.mediaUrl && (
                <Descriptions.Item label="Liên kết phương tiện" span={3}>
                  <Link
                    className="text-primary"
                    to={transactionDetail.data.post.mediaUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Xem phương tiện
                  </Link>
                </Descriptions.Item>
              )}
              <Descriptions.Item label="Nội dung yêu cầu" span={3}>
                <div className="mt-4 font-semibold">
                  Tiêu đề: {transactionDetail.data.post.title}
                </div>
                <div>
                  {HTMLReactParser(transactionDetail.data.post.content)}
                </div>{" "}
              </Descriptions.Item>
            </>
          )}
        </Descriptions>
      </Card>
    )
  );
}

export default TransactionDetail;
