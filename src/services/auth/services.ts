import { API_LOGIN } from "@/commons/api";
import instance from "../instance";
import { LoginRequest } from "./requests";
import { LoginResponse } from "./responses";

export const login = async (request: LoginRequest): Promise<LoginResponse> => {
  const { data } = await instance.post<LoginResponse>(API_LOGIN, request);
  if (data) {
    localStorage.setItem("access_token", data.accessToken);
    localStorage.setItem("refresh_token", data.refreshToken);
  }
  return data;
};
