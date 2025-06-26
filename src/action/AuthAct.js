import { authApi } from "services/apiVariables";
import { toast } from "react-toastify";
import { setUserRole, setUserData, setUserEmail } from "utils/authUtils";
import { api } from "services/api";

// export const loginApi = (body) => () => {
//   return new Promise((resolve, reject) => {
//     api({ ...authApi.loginAdminApi, body })
//       .then((data, message) => {
//         localStorage.setItem('authToken', JSON.stringify(data.token))
//         if (data?.data?.user?.role) {
//           // setUserRole(data?.data?.user?.role?.name)
//           // setUserData(data?.data?.user?._id)
//           // setUserEmail(data?.data?.user?.email)
//         }
//         toast.success(message)
//         resolve(data)
//       })
//       .catch((error) => {
//         reject(error)
//       })
//   })
// }

export const loginApi = (body) => () => {
  return new Promise((resolve, reject) => {
    api({ ...authApi.loginAdminApi, body })
      .then((data) => {
        // Store token
        console.log("✅ [loginApi] Success id:", data.user.id);

        if (data?.token) {
          localStorage.setItem("authToken", JSON.stringify(data.token));
        }
        setUserRole(data?.user?.role);
        setUserData(data?.user?.id);
        resolve(data);
      })
      .catch((error) => {
        console.error("❌ [loginApi] Failed:", error);
        reject({ message: error.message || "Login failed" });
      });
  });
};

export const forgotPasswordApi = (body) => () => {
  return new Promise((resolve, reject) => {
    api({ ...authApi.forgotPasswordApi, body })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// export const resetPasswordApi = (body) => () => {
//   return new Promise((resolve, reject) => {
//     api({ ...authApi.resetPasswordApi, body })
//       .then((data) => {
//         resolve(data)
//       })
//       .catch((error) => {
//         reject(error)
//       })
//   })
// }

export const resetPasswordApi =
  (token, body) =>
  (dispatch, getState, { api }) => {
    return new Promise((resolve, reject) => {
      const urlWithToken = `${authApi.resetPasswordApi.api}/${token}`;
      api({
        ...authApi.resetPasswordApi,
        api: urlWithToken,
        body,
      })
        .then((response) => {
          const { data, message } = response;
          toast.success(message);
          resolve(data);
        })
        .catch(({ message }) => {
          toast.error(message);
          reject(message);
        });
    });
  };
