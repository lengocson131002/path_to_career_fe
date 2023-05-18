import Logo from "../assets/logo.png";

type HeaderProps = {
  type?: "default" | "float";
};

function Header({}: HeaderProps) {
  return (
    <div id="header">
      <div className="w-full h-20 top-0 left-0 shadow-p2c flex justify-between items-center px-28 fixed z-50 bg-white">
        <img src={Logo} alt="p2c_logo" className="h-3/4" />
        <div className="flex gap-8">
          <div className="hover:text-primary cursor-pointer hover:font-semibold">
            Trang chủ
          </div>
          <div className="hover:text-primary cursor-pointer hover:font-semibold">
            Tìm việc làm
          </div>
          <div className="hover:text-primary cursor-pointer hover:font-semibold">
            Đăng nhập
          </div>
          <div className="hover:text-primary cursor-pointer hover:font-semibold">
            Đăng ký
          </div>
          <div className="hover:text-primary cursor-pointer hover:font-semibold">
            Đăng bài
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
