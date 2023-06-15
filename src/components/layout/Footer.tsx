import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";
import { FaFacebookSquare } from "react-icons/fa";
import Logo from "@/assets/logo.png";

type FooterProps = {
  type?: "default" | "float";
};

function Footer({}: FooterProps) {
  return (
    <div id="footer" className="md:h-[300px]">
      <div className="w-full md:h-[300px] shadow-p2c flex md:flex-nowrap flex-wrap md:justify-between md:items-start md:px-28 px-5 z-50 bg-white py-12">
        <div className="md:hidden flex gap-4 w-full justify-center mb-10">
          <FaFacebookSquare size={20} />
          <AiFillInstagram size={20} />
          <AiOutlineTwitter size={20} />
        </div>
        <div className="md:block flex md:w-auto w-full justify-center mb-10">
          <img src={Logo} alt="p2c_logo" className="md:h-28 h-20" />
        </div>
        <div className="flex md:justify-between justify-center md:gap-12 gap-6 md:flex-nowrap flex-wrap w-full md:w-auto">
          <div className="md:!max-w-[260px] md:basis-1/3 basis-full md:text-left text-center">
            <div className="font-bold md:mb-4 mb-2">Về chúng tôi</div>
            <div>Về chúng tôi</div>
            <div>Liên hệ</div>
            <div>Thoả thuận</div>
            <div>Cơ hội việc làm</div>
            <div>Quy định bảo mật</div>
            <div className="md:max-w-none md:mx-[unset] max-w-[220px] mx-auto">
              Quy chế hoạt động của sàn giao dịch thương mại điện tử
            </div>
          </div>
          <div className="md:basis-1/3 basis-full md:text-left text-center">
            <div className="font-bold md:mb-4 mb-1">Dịch vụ</div>
            <div>Đăng bài hỗ trợ</div>
            <div>Tìm kím việc làm</div>
            <div>Chỉnh sửa hồ sơ</div>
          </div>
          <div className="md:basis-1/3 basis-full md:text-left text-center md:block hidden">
            <div className="font-bold md:mb-4 mb-1">Theo dõi chúng tôi tại</div>
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
