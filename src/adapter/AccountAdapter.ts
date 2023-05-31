import { AccountBriefModel } from "@/services/accounts/models";
import { AccountBriefResponse } from "@/services/accounts/responses";

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
