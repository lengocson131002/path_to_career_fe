export const BASE_URL = import.meta.env.VITE_API_HOST_URL;

//ACCOUNTS
export const API_ACCOUNT = BASE_URL + "/v1/accounts";
export const API_ACCOUNT_DETAIL = BASE_URL + "/v1/accounts/{id}";
export const API_ACCOUNT_ACCEPT = BASE_URL + "/v1/accounts/accept/{id}";
export const API_ACCOUNT_ME = BASE_URL + "/v1/accounts/me";

//AUTH
export const API_AUTH_LOGIN = BASE_URL + "/v1/auth/login";
export const API_AUTH_LOGIN_GOOGLE = BASE_URL + "/v1/auth/google-login";
export const API_AUTH_REFRESH = BASE_URL + "/v1/auth/refresh";
//AUTH
export const API_MAJOR_CODE = BASE_URL + "/v1/majors";

//REVIEW
export const API_REVIEW = BASE_URL + "/v1/reviews";

//POST
export const API_POST = BASE_URL + "/v1/posts";
export const API_POST_DETAIL = BASE_URL + "/v1/posts/{id}";
export const API_POST_ACCEPT = BASE_URL + "/v1/posts/{id}/accept";
export const API_POST_COMPLETE = BASE_URL + "/v1/posts/{id}/complete";
export const API_POST_PAYMENT = BASE_URL + "/v1/posts/{id}/pay";

//POST APPLICATION
export const API_POST_APPLICATION = BASE_URL + "/v1/posts/{id}/applications";

//MESSAGE
export const API_POST_MESSAGE = BASE_URL + "/v1/posts/{id}/messages";

//FILE
export const API_FILE = BASE_URL + "/v1/files";

//TRANSACTION
export const API_TRANSACTION = BASE_URL + "/v1/transactions";
export const API_TRANSACTION_DETAIL = BASE_URL + "/v1/transactions/{id}";
export const API_TRANSACTION_CONFIRM =
  BASE_URL + "/v1/transactions/{id}/confirm";
export const API_TRANSACTION_CANCEL = BASE_URL + "/v1/transactions/{id}/cancel";

//NOTIFICATION
export const API_NOTIFICATION = BASE_URL + "/v1/notifications";
export const API_NOTIFICATION_READ = BASE_URL + "/v1/notifications/{id}/read";

//STATISTIC
export const API_DASHBOARD_STATISTICS = BASE_URL + "/v1/dashboard/statistics";
export const API_DASHBOARD_ACCOUNTS = BASE_URL + "/v1/dashboard/accounts";
export const API_DASHBOARD_POSTS = BASE_URL + "/v1/dashboard/posts";
export const API_DASHBOARD_FREELANCERS =
  BASE_URL + "/v1/dashboard/freelancers/top";
