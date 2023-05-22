import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";
import { FaFacebookSquare } from "react-icons/fa";
import Logo from "@/assets/logo.png";

type FooterProps = {
  type?: "default" | "float";
};

function Footer({}: FooterProps) {
  return (
    <div id="footer">
      <div className="w-full h-[300px] shadow-p2c flex justify-between items-start px-28 z-50 bg-white py-12">
        <img src={Logo} alt="p2c_logo" className="h-28" />
        <div className="flex justify-between gap-12">
          <div
            style={{
              maxWidth: 260,
            }}
          >
            <div className="font-bold mb-4">Về chúng tôi</div>
            <div>Về chúng tôi</div>
            <div>Liên hệ</div>
            <div>Thoả thuận</div>
            <div>Cơ hội việc làm</div>
            <div>Quy định bảo mật</div>
            <div>Quy chế hoạt động của sàn giao dịch thương mại điện tử</div>
          </div>
          <div>
            <div className="font-bold mb-4">Dịch vụ</div>
            <div>Đăng bài hỗ trợ</div>
            <div>Tìm kím việc làm</div>
            <div>Chỉnh sửa hồ sơ</div>
          </div>
          <div>
            <div className="font-bold mb-4">Theo dõi chúng tôi tại</div>
            <div className="flex text-xl gap-4">
              <FaFacebookSquare />
              <AiFillInstagram />
              <AiOutlineTwitter />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
