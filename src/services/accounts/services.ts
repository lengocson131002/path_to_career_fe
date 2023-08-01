import { mapAccountModel } from "@/adapter/AccountAdapter";
import { mapPage } from "@/adapter/PaginationAdapter";
import {
  API_ACCOUNT,
  API_ACCOUNT_ACCEPT,
  API_ACCOUNT_DETAIL,
  API_ACCOUNT_ME,
} from "@/commons/api";
import { EnumKeys, Roles } from "@/commons/enum";
import { PaginationModel } from "../core/models";
import { PaginationResponse } from "../core/responses";
import instance from "../instance";
import { AccountModel } from "./models";
import { AccountRequest, UpdateAccountRequest } from "./requests";
import { AccountResponse } from "./responses";

export const register = async (
  request: AccountRequest
): Promise<AccountModel> => {
  const { data } = await instance.post<AccountResponse>(API_ACCOUNT, request);
  return mapAccountModel(data);
};

export const getMe = async (): Promise<AccountModel> => {
  const { data } = await instance.get<AccountResponse>(API_ACCOUNT_ME, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
  return mapAccountModel(data);
};

export const getAccount = async (id?: string): Promise<AccountModel> => {
  const { data } = await instance.get<AccountResponse>(
    API_ACCOUNT_DETAIL.replace("{id}", id ?? ""),
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }
  );
  return mapAccountModel(data);
};

export const getAccounts = async ({
  id,
  role,
}: {
  id?: string;
  role?: EnumKeys<typeof Roles>;
}): Promise<PaginationModel<AccountModel>> => {
  const { data } = await instance.get<PaginationResponse<AccountResponse>>(
    API_ACCOUNT,
    {
      params: {
        role: role,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }
  );
  return mapPage<AccountResponse, AccountModel>(data, mapAccountModel);
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
    avatar: data.avatar,
    role: data.role,
    score: data.score,
    majors: data.majors?.map((major) => ({
      id: major.id,
      code: major.code,
      name: major.name,
    })),
  };
};

export const acceptFreelancer = async (id: number) => {
  await instance.post<AccountResponse>(
    API_ACCOUNT_ACCEPT.replace("{id}", id.toString()),
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }
  );
};
