import { API_ACCOUNT, API_ACCOUNT_ME } from "@/commons/api";
import { AccountResponse } from "./responses";
import { AccountRequest } from "./requests";
import instance from "../instance";
import { AccountModel } from "./models";

export const register = async (
  request: AccountRequest
): Promise<AccountModel> => {
  const { data } = await instance.post<AccountResponse>(API_ACCOUNT, request);
  return {
    description: data.description,
    email: data.email,
    fullName: data.fullName,
    id: data.id,
    phoneNumber: data.phoneNumber,
    role: data.role,
    score: data.score,
  };
};

export const getMe = async (): Promise<AccountModel> => {
  const { data } = await instance.get<AccountResponse>(API_ACCOUNT_ME, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
  return {
    description: data.description,
    email: data.email,
    fullName: data.fullName,
    id: data.id,
    phoneNumber: data.phoneNumber,
    role: data.role,
    score: data.score,
  };
};
