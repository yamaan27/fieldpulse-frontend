import React from "react";
import axios from "axios";
import CryptoJS from "crypto-js";
import { Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { history } from "services/helpers";
import { Toast } from "services/toast";
import { endPoints } from "./helpers/config";

// ADD QUERY FROM API page: null,
// export const addQuery = (dataObject, apiObject) => {
//   const keys = [
//     'search',
//     'page',
//     'pageSize',
//     'sendClient',
//     'sendInternal',
//     'submit',
//     'sort',
//     'sortby',
//     'sortbyClientName',
//     'username',
//     'businessUnit',
//     'solutionCenter',
//     'type',
//     'agOpportunity',
//     'xplusRecommendation',
//     'Escalation',
//     'Governance',
//   ]
//   if (!dataObject) {
//     return ''
//   }

//   keys.forEach((key) => {
//     let dataObjectValue = dataObject
//     let apiObjectValue = apiObject.query
//     let keyValue = key
//     if (key === 'search') {
//       if (typeof dataObject[key] === 'string') {
//         if (dataObject.search) {
//           apiObject.query.search = dataObject.search
//         } else {
//           delete apiObject.query.search
//         }
//       } else {
//         delete apiObject.query.search
//       }
//     }
//     if (key === 'username') {
//       if (typeof dataObject[key] === 'string') {
//         if (dataObject.username) {
//           apiObject.query.username = dataObject.username
//         } else {
//           delete apiObject.query.username
//         }
//       } else {
//         delete apiObject.query.username
//       }
//     }
//     if (
//       Object.prototype.hasOwnProperty.call(dataObjectValue, keyValue) &&
//       typeof dataObject[key] != 'object'
//     ) {
//       if (Object.prototype.hasOwnProperty.call(apiObjectValue, keyValue)) {
//         apiObject.addQuery = { key, payload: dataObject[key] }
//       }
//     } else {
//       dataObject[key] &&
//         Object.keys(dataObject[key]).forEach((keyName) => {
//           if (Object.prototype.hasOwnProperty.call(apiObjectValue, keyName)) {
//             apiObject.addQuery = {
//               key: keyName,
//               payload: dataObject[key][keyName],
//             }
//           }
//         })
//     }
//   })
// }

export const addQuery = (dataObject, apiObject) => {
  const keys = [
    "search",
    "page",
    "pageSize",
    "filter",
    "sendInternal",
    "submit",
    "sort",
    "sortby",
    "sortbyClientName",
    "username",
    "businessUnit",
    "solutionCenter",
    "type",
    "agOpportunity",
    "xplusRecommendation",
    "Escalation",
    "Governance",
  ];

  if (!dataObject) {
    return "";
  }

  // Reset apiObject.query to avoid keeping old query values
  apiObject.query = {};

  keys.forEach((key) => {
    if (key === "search" || key === "username") {
      if (typeof dataObject[key] === "string") {
        if (dataObject[key]) {
          apiObject.query[key] = dataObject[key];
        }
      }
    } else if (
      Object.prototype.hasOwnProperty.call(dataObject, key) &&
      typeof dataObject[key] !== "object"
    ) {
      apiObject.query[key] = dataObject[key];
    } else if (dataObject[key] && typeof dataObject[key] === "object") {
      Object.keys(dataObject[key]).forEach((subKey) => {
        if (dataObject[key][subKey]) {
          apiObject.query[subKey] = dataObject[key][subKey];
        }
      });
    }
  });
};

export const generateQuery = (query) => {
  let url = "";

  if (Object.prototype.hasOwnProperty.call(query, "url_id")) {
    url = `/${query.url_id}`;
    delete query.url_id;
  }

  const queryString = Object.keys(query)
    .filter((key) => {
      const value = query[key];
      return (
        value !== null &&
        (typeof value === "string" ? value.trim() !== "" : true)
      );
    })
    .map((key) => {
      let value = query[key];
      if (typeof value === "string") {
        value = value.replace(/\s+/g, " ").trim();
      }
      const encodedValue = key === "#" ? query[key] : encodeURIComponent(value);
      return `${key}=${encodedValue}`;
    })
    .join("&");

  return url + (queryString ? `?${queryString}` : "");
};

// TABLE SORTING FUNCTION
export const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

// TABLE SORTING FUNCTION
export const getComparator = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

// TABLE SORTING FUNCTION
export const stableSort = (array, comparator) => {
  const filterList = array.map((el, index) => [el, index]);
  filterList.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return filterList.map((el) => el[0]);
};

// ENCRYPTION FUNCTION
export const encryptData = (text, key) => {
  if (text && key)
    return CryptoJS.AES.encrypt(JSON.stringify(text), key).toString();
};

// DECRYPTION FUNCTION
export const decryptData = (text, key) => {
  if (text && key) {
    const bytes = CryptoJS.AES.decrypt(text, key);
    try {
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (err) {
      return null;
    }
  }
};

// SESSIONSTORAGE GET FUNCTION
export const getDataFromStorage = (storageName) => {
  let data = localStorage?.getItem(storageName);
  return data;
};

// SESSIONSTORAGE SET FUNCTION
export const setDataFromStorage = (storageData, storageKey) => {
  const encryptedData = encryptData(storageData, storageKey);
  localStorage.setItem(storageKey, encryptedData);
};

// ERROR TOAST
export const errorToast = (message) => {
  Toast({ type: "error", message });
};

// SUCCESS TOAST
export const successToast = (message) => {
  Toast({ type: "success", message });
};

// URL GET QUERY
export const useQuery = (params) => {
  const search = useLocation()?.search;
  return new URLSearchParams(search).get(params);
};

// IP ADDRESS FETCH FUNCTION
export const getIpAddress = async () => {
  const data = await axios({
    method: "get",
    url: process.env.REACT_APP_IP_BASE_URL,
  });
  let ip = data.data;
  localStorage.setItem(endPoints.auth.IP, ip);
  return data;
};

//SCROLL TOP FUNCTION
export const goToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

// HANDLE ROUTER PUSHER
export const handleRoute = (paramsKey) => {
  history.push(paramsKey);
};

// export const errorMessageToDisplay = (
//   validator,
//   errorName,
//   errorValue,
//   validationMethod
// ) => {
//   let evalue = errorValue !== undefined ? String(errorValue) : undefined
//   // let evalue = errorValue
//   console.error('evalue---->', evalue)

//   //  const isEmptySpace =  typeof errorValue === 'string' && errorValue.trim() === "";
//   const isEmptySpace = evalue && String(evalue).trim() === ''

//   const errorMessage = validator.message(errorName, evalue, validationMethod)
//   return (
//     <div className="error_msg_text">
//       {isEmptySpace && <div>Field must not be empty or start with a space</div>}
//       {!isEmptySpace && (
//         <div>{validator.message(errorName, evalue, validationMethod)}</div>
//       )}
//     </div>
//   )
// }
export const errorMessageToDisplay = (
  validator,
  errorName,
  errorValue,
  validationMethod,
  customClassName = "error_msg_text"
) => {
  return (
    <Typography
      className={customClassName}
      color="error"
      variant="caption"
      sx={{ fontSize: "13px", mb: 1 }}
    >
      {validator?.message(errorName, errorValue, validationMethod)}
    </Typography>
  );
};
