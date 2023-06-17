import { getMe } from "@/services/accounts/services";
import { loginGoogle } from "@/services/auth/services";
import store from "@/stores";
import { setGlobalState } from "@/stores/global.store";
import { setUserState } from "@/stores/user.store";
import { useMutation } from "@tanstack/react-query";
import { Button, message } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Google from "../../assets/google-icon.png";

function LoginGoogle() {
  const searchParams = new URLSearchParams(window.location.hash.substring(1));
  const mutation = useMutation((idToken: string) => loginGoogle(idToken));
  const navigate = useNavigate();
  const token = searchParams.get("id_token");
  const me = useMutation(() => getMe());

  const handleGoogleLogin = () => {
    const redirectUri = `${window.location.origin}/dang-nhap`;
    const scope =
      "openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

    const url =
      `${import.meta.env.VITE_GOOGLE_AUTH_URL}?` +
      `client_id=${clientId}&` +
      `redirect_uri=${redirectUri}&` +
      `response_type=code id_token&` +
      `response_mode=query&` +
      `scope=${scope}`;
    window.location = url as unknown as Location;
  };

  useEffect(() => {
    if (token) {
      store.dispatch(
        setGlobalState({
          loading: true,
        })
      );
      mutation.mutate(token);
    }
  }, [token]);

  useEffect(() => {
    if (mutation.isSuccess) {
      me.mutate();
    }
  }, [mutation.isSuccess]);

  useEffect(() => {
    if (me.isSuccess) {
      message.success("Đăng nhập thành công");
      store.dispatch(
        setGlobalState({
          loading: false,
        })
      );
      store.dispatch(
        setUserState({
          account: me.data,
        })
      );
      if (me.data.role === "User") {
        navigate("/");
      } else {
        navigate("/dashboard");
      }
    }
  }, [me.isSuccess]);

  return (
    <Button
      type="default"
      className="group bg-white text-primary border-primary border-1 hover:!bg-primary hover:!text-white hover:!border-primary w-full h-10 text-base font-semibold"
      onClick={handleGoogleLogin}
    >
      <div className="flex justify-center items-center group-hover:brightness-0 group-hover:saturate-100 group-hover:invert group-hover:duration-100">
        <div className="w-5 h-5 mr-4">
          <img src={Google} alt="" className="w-full" />
        </div>
        <div className="">Đăng nhập với Google</div>
      </div>
    </Button>
  );
}

export default LoginGoogle;
