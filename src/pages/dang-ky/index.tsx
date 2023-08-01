import RegisterSteps from "@/components/register/RegisterSteps";
import { Link } from "react-router-dom";
import Object from "../../assets/auth-decor-register.png";
import Background from "../../assets/auth-decor.png";
import Logo from "../../assets/logo-only.png";

function RegisterPage() {
  return (
    <div className="register__container w-full flex overflow-y-hidden">
      <div className="register__decoration order-2 basis-1/2 relative h-screen">
        <div className="register__decoration--background h-full w-full rotate-180 -scale-y-100">
          <img src={Background} alt="" className="h-full" />
        </div>
        <div className="register__decoration--object absolute w-9/12 h-1/2 top-0 translate-x-[20%] translate-y-1/4">
          <img src={Object} alt="" className="w-full" />
        </div>
      </div>
      <div className="register__main order-1 basis-1/2 h-screen flex items-center justify-center">
        <div className="register__main--content 3/5 pl-10">
          <div className="register__main--logo max-w-[100px]">
            <Link to="/">
              <img className="object-contain max-w-[100px]" src={Logo} alt="" />
            </Link>
          </div>
          <div className="register__main--header uppercase text-2xl font-bold mt-3">
            Đăng ký
          </div>
          <RegisterSteps />
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
