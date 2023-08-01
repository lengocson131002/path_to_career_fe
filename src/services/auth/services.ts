import {
  API_AUTH_LOGIN,
  API_AUTH_LOGIN_GOOGLE,
  API_AUTH_REFRESH,
} from "@/commons/api";
import instance from "../instance";
import { LoginModel } from "./models";
import { LoginRequest } from "./requests";
import { LoginResponse } from "./responses";

export const login = async (request: LoginRequest): Promise<LoginModel> => {
  const { data } = await instance.post<LoginResponse>(API_AUTH_LOGIN, request);
  if (data) {
    localStorage.setItem("access_token", data.accessToken);
    localStorage.setItem("refresh_token", data.refreshToken);
  }
  return {
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
  };
};

export const refresh = async (refreshToken: string): Promise<LoginModel> => {
  const { data } = await instance.post<LoginResponse>(API_AUTH_REFRESH, {
    refreshToken: refreshToken,
  });
  if (data) {
    localStorage.setItem("access_token", data.accessToken);
    localStorage.setItem("refresh_token", data.refreshToken);
  }
  return {
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
  };
};

export const loginGoogle = async (idToken: string): Promise<LoginModel> => {
  const { data } = await instance.post<LoginResponse>(API_AUTH_LOGIN_GOOGLE, {
    idToken: idToken,
  });
  if (data) {
    localStorage.setItem("access_token", data.accessToken);
    localStorage.setItem("refresh_token", data.refreshToken);
  }
  return {
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
  };
};

export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};
