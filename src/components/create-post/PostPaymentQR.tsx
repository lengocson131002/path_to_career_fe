import QRBanking from "@/assets/qr-banking.jpg";
import QRMomo from "@/assets/qr-momo.jpg";
import { EnumKeys, PaymentMethod } from "@/commons/enum";
import { PaymentInfo } from "@/pages/bai-dang/tao-bai-dang";
import { Button } from "antd";
import "react-quill/dist/quill.snow.css";
import { Link } from "react-router-dom";

function PostPaymentQR({
  type,
  paymentInfo,
}: {
  type: EnumKeys<typeof PaymentMethod>;
  paymentInfo?: PaymentInfo;
}) {
  return (
    <div className="flex flex-col justify-center items-center">
      {(() => {
        switch (type) {
          case "Momo": {
            return <img className="max-w-[400px]" src={QRMomo} />;
          }
          case "Banking": {
            return <img className="max-w-[400px]" src={QRBanking} />;
          }
        }
      })()}
      {paymentInfo && (
        <div className="grid grid-cols-12 gap-x-4">
          <div className="text-xl grid col-span-6 text-end">Số tiền: </div>
          <div className="font-bold text-xl text-primary col-span-6">
            {paymentInfo?.amount.toLocaleString("vi", {
              style: "currency",
              currency: "VND",
            })}
          </div>
          <div className="text-xl col-span-6 text-end">
            Nội dung chuyển khoản:
          </div>
          <div className="font-bold text-xl text-primary col-span-6">
            {paymentInfo?.content}
          </div>
        </div>
      )}
      <Link to={"/bai-dang"}>
        <Button type="primary" className="mt-4">
          Danh sách bài đăng
        </Button>
      </Link>
    </div>
  );
}

export default PostPaymentQR;
