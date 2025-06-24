// import { errorToast } from './helperFunctions'
import { BASE_URL } from "./helpers/config";
import { axiosInstance, logout } from "./utilities";

// let isErrorMessageShown = false

export const api = async function ({
  method = "get",
  api,
  body,
  status = false,
  baseURL = "normal",
}) {
  return await new Promise((resolve, reject) => {
    if (baseURL === "auth") {
      // axiosInstance.defaults.headers['Content-Type'] = 'application/json'
      if (!(body instanceof FormData)) {
        axiosInstance.defaults.headers["Content-Type"] = "application/json";
      } else {
        delete axiosInstance.defaults.headers["Content-Type"]; // Let Axios handle the Content-Type for FormData
      }
    }

    if (localStorage.getItem("authToken")) {
      // let getToken = localStorage.getItem('authToken')
      let getToken = localStorage.getItem("authToken").replace(/"/g, "");
      axiosInstance.defaults.headers.common["authorization"] = getToken;
    }

    let payload = body ? body : {};

    axiosInstance[method](`${getServiceUrl(baseURL)}${api}`, payload)
      .then((data) => {
        resolve(statusHelper(status, data));
      })
      .catch((error) => {
        try {
          if (error.response) {
            reject(statusHelper(status, error.response));
          } else {
            reject(error);
          }
        } catch (err) {
          reject(err);
        }
      });
  });
};

// let statusHelper = (status, data) => {
//   if (data.status === 401 || data.status === 403) {
//     if (!isErrorMessageShown) {
//       isErrorMessageShown = true
//       logout()
//       errorToast(
//         data.status === 401
//           ? 'Unauthorized access. Please log in with valid credentials.'
//           : 'Access denied. You do not have permission to access this resource. '
//       )
//     }
//   } else {
//     isErrorMessageShown = false
//     if (status) {
//       return {
//         status: data.status,
//         ...data.data,
//       }
//     } else {
//       return data.data
//     }
//   }
// }

let statusHelper = (status, data) => {
  if (data.status === 401 || data.status === 403) {
    logout();
  }
  if (status) {
    return {
      status: data.status,
      ...data.data,
    };
  } else {
    return data.data;
  }
};

let getServiceUrl = (baseURL) => {
  let finalURL = "";
  if (baseURL === "auth") {
    finalURL = BASE_URL;
  }
  return finalURL;
};
