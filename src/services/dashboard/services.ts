import {
  API_DASHBOARD_ACCOUNTS,
  API_DASHBOARD_FREELANCERS,
  API_DASHBOARD_POSTS,
  API_DASHBOARD_STATISTICS,
} from "@/commons/api";
import instance from "../instance";

import { mapAccountModel } from "@/adapter/AccountAdapter";
import {
  mapDashboardAccounts,
  mapDashboardPosts,
  mapStatisticModel,
} from "@/adapter/DashboardAdapter";
import { AccountModel } from "../accounts/models";
import { AccountResponse } from "../accounts/responses";
import {
  DashboardAccountsModel,
  DashboardPostsModel,
  StatisticModel,
} from "./models";
import {
  DashboardAccountsResponse,
  DashboardPostsResponse,
  StatisticResponse,
} from "./responses";

import dayjs from "dayjs";

export const getStatistic = async ({
  from,
  to,
}: {
  from?: dayjs.Dayjs;
  to?: dayjs.Dayjs;
}): Promise<StatisticModel> => {
  const { data } = await instance.get<StatisticResponse>(
    API_DASHBOARD_STATISTICS,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      params: {
        from: from ? from.toISOString() : undefined,
        to: to ? to.toISOString() : undefined,
      },
    }
  );
  return mapStatisticModel(data);
};

export const getTopFreelancers = async (): Promise<Array<AccountModel>> => {
  const { data } = await instance.get<Array<AccountResponse>>(
    API_DASHBOARD_FREELANCERS,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }
  );
  return data.map((freelancer) => mapAccountModel(freelancer));
};

export const getDashboardPosts = async ({
  from,
  to,
}: {
  from?: dayjs.Dayjs;
  to?: dayjs.Dayjs;
}): Promise<DashboardPostsModel> => {
  const { data } = await instance.get<DashboardPostsResponse>(
    API_DASHBOARD_POSTS,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      params: {
        from: from ? from.toISOString() : undefined,
        to: to ? to.toISOString() : undefined,
      },
    }
  );
  return mapDashboardPosts(data);
};

export const getDashboardAccounts = async ({
  from,
  to,
}: {
  from?: dayjs.Dayjs;
  to?: dayjs.Dayjs;
}): Promise<DashboardAccountsModel> => {
  const { data } = await instance.get<DashboardAccountsResponse>(
    API_DASHBOARD_ACCOUNTS,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      params: {
        from: from ? from.toISOString() : undefined,
        to: to ? to.toISOString() : undefined,
      },
    }
  );
  return mapDashboardAccounts(data);
};
