import { API_ACCOUNT, API_ACCOUNT_ME } from "@/commons/api";
import instance from "../instance";
import { AccountModel } from "./models";
import { AccountRequest, UpdateAccountRequest } from "./requests";
import { AccountResponse } from "./responses";

export const register = async (
  request: AccountRequest
): Promise<AccountModel> => {
  const { data } = await instance.post<AccountResponse>(API_ACCOUNT, request);
  return {
    description: data.description,
    email: data.email,
    name: data.fullName,
    id: data.id,
    phone: data.phoneNumber,
    role: data.role,
    score: data.score,
    majors: data.majors?.map((major) => ({
      code: major.code,
      name: major.name,
    })),
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
    name: data.fullName,
    id: data.id,
    phone: data.phoneNumber,
    role: data.role,
    score: data.score,
    majors: data.majors?.map((major) => ({
      code: major.code,
      name: major.name,
    })),
  };
};

export const updateAccount = async (
  request: UpdateAccountRequest
): Promise<AccountModel> => {
  const { data } = await instance.put<AccountResponse>(API_ACCOUNT, request, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
  return {
    description: data.description,
    email: data.email,
    name: data.fullName,
    id: data.id,
    phone: data.phoneNumber,
    role: data.role,
    score: data.score,
    majors: data.majors?.map((major) => ({
      code: major.code,
      name: major.name,
    })),
  };
};
