import { Button } from "antd";
import "react-quill/dist/quill.snow.css";
import { Link } from "react-router-dom";

function PostPaymentQR() {
  return (
    <div className="flex flex-col justify-center items-center">
      <img
        className="max-w-[400px]"
        src="https://img.vietqr.io/image/vietinbank-113366668888-compact.jpg"
      />
      <Link to={"/bai-dang"}>
        <Button type="primary" className="mt-4">
          Danh sách bài đăng
        </Button>
      </Link>
    </div>
  );
}

export default PostPaymentQR;
