import { AccountBriefModel, AccountModel } from "@/services/accounts/models";
import {
  AccountBriefResponse,
  AccountResponse,
} from "@/services/accounts/responses";

export const mapAccountBriefModel = (
  res?: AccountBriefResponse
): AccountBriefModel | undefined => {
  if (!res) {
    return undefined;
  }
  return {
    description: res.description,
    email: res.email,
    fullName: res.fullName,
    id: res.id,
    phoneNumber: res.phoneNumber,
    avatar: res.avatar,
    role: res.role,
    score: res.score,
  };
};

export const mapAccountModel = (res: AccountResponse): AccountModel => {
  return {
    description: res.description,
    email: res.email,
    name: res.fullName,
    id: res.id,
    phone: res.phoneNumber,
    avatar: res.avatar,
    role: res.role,
    score: res.score,
    isAccepted: res.isAccepted,
    majors: res.majors?.map((major) => ({
      id: major.id,
      code: major.code,
      name: major.name,
    })),
  };
};
