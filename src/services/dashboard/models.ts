import { EnumKeys, PaymentMethod, TransactionStatus } from "@/commons/enum";
import dayjs from "dayjs";
import { AccountModel } from "../accounts/models";
import { PostModel } from "../posts/models";

export type StatisticModel = {
  userCount: number;
  freelancerCount: number;
  postCount: number;
  revenue: number;
};

export type DashboardPostsModel = {
  byService: { CreateCV: number; ReviewCV: number; MockInterview: number };
  byStatus: { New: number; Paid: number; Accepted: number; Done: number };
};

export type DashboardAccountsModel = {
  Admin: { active: number; inactive: number };
  Freelancer: { active: number; inactive: number };
  User: { active: number; inactive: number };
};
