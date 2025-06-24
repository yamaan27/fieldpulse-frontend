import { generateQuery } from "services/helperFunctions";

export const authApi = {
  loginAdminApi: {
    api: "api/auth/login",
    method: "post",
    baseURL: "auth",
  },
  forgotPasswordApi: {
    api: "users/forgotPassword",
    method: "post",
    baseURL: "auth",
  },
  resetPasswordApi: {
    api: "users/updatePassword",
    method: "post",
    baseURL: "auth",
  },
};
