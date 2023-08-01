export type StatisticResponse = {
  userCount: number;
  freelancerCount: number;
  postCount: number;
  revenue: number;
};

export type DashboardPostsResponse = {
  byService: { CreateCV: number; ReviewCV: number; MockInterview: number };
  byStatus: { New: number; Paid: number; Accepted: number; Done: number };
};

export type DashboardAccountsResponse = {
  Admin: { active: number; inactive: number };
  Freelancer: { active: number; inactive: number };
  User: { active: number; inactive: number };
};
