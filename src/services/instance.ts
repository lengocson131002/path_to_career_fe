import { message as $message } from "antd";
import axios from "axios";

import { BASE_URL } from "@/commons/api";
import store from "@/stores";
import { setGlobalState } from "@/stores/global.store";
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
    store.dispatch(
      setGlobalState({
        loading: true,
      })
    );

    return config;
  },
  (error) => {
    store.dispatch(
      setGlobalState({
        loading: false,
      })
    );
    Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (config) => {
    store.dispatch(
      setGlobalState({
        loading: false,
      })
    );

    if (config?.data?.message) {
      // $message.success(config.data.message)
    }

    return config;
  },
  (error) => {
    store.dispatch(
      setGlobalState({
        loading: false,
      })
    );
    // if needs to navigate to login page when request exception
    // history.replace('/login');
    let errorMessage = "Có lỗi xảy ra. Vui lòng thử lại sau.";

    if (error?.message?.includes("Network Error")) {
      errorMessage = "Mạng không ổn định. Vui lòng thử lại sau.";
    } else {
      errorMessage = error?.response?.data?.message;
    }

    error.message && $message.error(errorMessage);

    return Promise.reject();
    // return {
    //   status: false,
    //   message: errorMessage,
    //   result: null,
    // };
  }
);

export type Response<T = any> = {
  status: boolean;
  message: string;
  result: T;
};

export type MyResponse<T = any> = Promise<Response<T>>;

/**
 *
 * @param method - request methods
 * @param url - request url
 * @param data - request data or params
 */

export default instance;
