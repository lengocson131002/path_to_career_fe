import { Link } from "react-router-dom";
import Object from "../../assets/auth-decor-login.png";
import Background from "../../assets/auth-decor.png";
import Logo from "../../assets/logo-only.png";
import Login from "@/components/login/Login";

function LoginPage() {
  return (
    <div className="login__container w-full flex overflow-y-hidden">
      <div className="login__decoration order-1 basis-1/2 relative h-screen">
        <div className="login__decoration--background h-full w-full">
          <img src={Background} alt="" className="h-full" />
        </div>
        <div className="login__decoration--object absolute w-2/3 h-1/2 top-0 translate-x-1/4 translate-y-1/3">
          <img src={Object} alt="" className="w-full" />
        </div>
      </div>
      <div className="login__main order-2 basis-1/2 h-screen flex items-center justify-center">
        <div className="login__main--content w-2/3">
          <div className="login__main--logo max-w-[100px]">
            <Link to="/">
              <img className="object-contain max-w-[100px]" src={Logo} alt="" />
            </Link>
          </div>
          <div className="login__main--header uppercase text-2xl font-bold mt-3">
            Đăng nhập
          </div>
          <Login />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
