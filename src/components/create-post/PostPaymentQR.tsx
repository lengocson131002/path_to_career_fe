import QRBanking from "@/assets/qr-banking.jpg";
import QRMomo from "@/assets/qr-momo.jpg";
import { EnumKeys, PaymentMethod } from "@/commons/enum";
import { Button } from "antd";
import "react-quill/dist/quill.snow.css";
import { Link } from "react-router-dom";

function PostPaymentQR({ type }: { type: EnumKeys<typeof PaymentMethod> }) {
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
      <Link to={"/bai-dang"}>
        <Button type="primary" className="mt-4">
          Danh sách bài đăng
        </Button>
      </Link>
    </div>
  );
}

export default PostPaymentQR;
