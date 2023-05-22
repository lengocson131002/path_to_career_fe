import { API_ACCOUNT } from "@/commons/api";
import { AccountResponse } from "./responses";
import { AccountRequest } from "./requests";
import instance from "../instance";

export const register = async (
  request: AccountRequest
): Promise<AccountResponse> => {
  const { status, data } = await instance.post<AccountResponse>(
    API_ACCOUNT,
    request
  );
  if (status !== 200) {
    return Promise.reject();
  }
  return data;
};
