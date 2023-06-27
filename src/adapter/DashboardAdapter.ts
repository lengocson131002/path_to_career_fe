import {
  DashboardAccountsModel,
  DashboardPostsModel,
  StatisticModel,
} from "@/services/dashboard/models";
import {
  DashboardAccountsResponse,
  DashboardPostsResponse,
  StatisticResponse,
} from "@/services/dashboard/responses";

export const mapStatisticModel = (res: StatisticResponse): StatisticModel => {
  return {
    freelancerCount: res.freelancerCount,
    postCount: res.postCount,
    revenue: res.revenue,
    userCount: res.userCount,
  };
};

export const mapDashboardPosts = (
  res: DashboardPostsResponse
): DashboardPostsModel => {
  return {
    byService: res.byService,
    byStatus: res.byStatus,
  };
};

export const mapDashboardAccounts = (
  res: DashboardAccountsResponse
): DashboardAccountsModel => {
  return {
    Admin: res.Admin,
    Freelancer: res.Freelancer,
    User: res.User,
  };
};
