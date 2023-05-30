export const BASE_URL = import.meta.env.VITE_API_BASE_URL;

//ACCOUNTS
export const API_ACCOUNT = "/v1/accounts";
export const API_ACCOUNT_DETAIL = "/v1/accounts/{id}";
export const API_ACCOUNT_ME = "/v1/accounts/me";

//AUTH
export const API_AUTH_LOGIN = `/v1/auth/login`;
export const API_AUTH_REFRESH = `/v1/auth/refresh`;
//AUTH
export const API_MAJOR_CODE = `/v1/majors`;

//REVIEW
export const API_REVIEW = `/v1/reviews`;

//REVIEW
export const API_POST = `/v1/posts`;
export const API_POST_DETAIL = `/v1/posts/{id}`;


//FILE
export const API_FILE = `/v1/files`;