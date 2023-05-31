import { message as $message } from "antd";
import axios from "axios";

import { BASE_URL } from "@/commons/api";
import { refresh } from "./auth/services";
// import { history } from '@/routes/history';

const instance = axios.create({
  timeout: 6000,
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    // store.dispatch(
    //   setGlobalState({
    //     loading: true,
    //   })
    // );
    return config;
  },
  (error) => {
    // store.dispatch(
    //   setGlobalState({
    //     loading: false,
    //   })
    // );
    Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (config) => {
    // store.dispatch(
    //   setGlobalState({
    //     loading: false,
    //   })
    // );

    if (config?.data?.message) {
      // $message.success(config.data.message)
    }

    return config;
  },
  async (error) => {
    // store.dispatch(
    //   setGlobalState({
    //     loading: false,
    //   })
    // );
    // if needs to navigate to login page when request exception
    // history.replace('/login');
    let errorMessage = "Có lỗi xảy ra. Vui lòng thử lại sau.";

    const originalRequest = error.config;
    if (error?.response?.status === 401 || error?.response?.status === 403) {
      const refreshToken = localStorage.getItem("refresh_token");
      if (!originalRequest?.retry && refreshToken) {
        originalRequest.retry = true;
        const { accessToken } = await refresh(refreshToken);
        return instance({
          ...originalRequest,
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        });
      } else {
        localStorage.clear();
        errorMessage = "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại";
      }
    }
    if (error?.message?.includes("Network Error")) {
      errorMessage = "Kết nối không ổn định. Vui lòng thử lại sau.";
    } else {
      errorMessage = error?.response?.data?.message;
    }

    if (error?.response?.status !== 401 && error?.response?.status !== 500) {
      error.message && $message.error(errorMessage);
      return Promise.reject();
    }
    return error?.response?.data;
  }
);

export default instance;
