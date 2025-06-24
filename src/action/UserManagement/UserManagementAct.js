import { userManagementApiVariables } from 'services/apiVariable/userManagementApiVariables'
import { toast } from 'react-toastify'
import { addQuery } from 'services/helperFunctions'

export const getAllUsersApi =
  (query) =>
  (dispatch, getState, { api }) => {
    addQuery(query, userManagementApiVariables.getAllUsersUrl)
    return new Promise((resolve, reject) => {
      api({
        ...userManagementApiVariables.getAllUsersUrl,
      })
        .then((data ) => {
          resolve(data)
        })
        .catch(({ message }) => {
          reject(toast.error(message))
        })
    })
  }

export const getbyidApi =
  (query) =>
  (dispatch, getState, { api }) => {
    userManagementApiVariables.getbyidUrl.id = query.id
    return new Promise((resolve, reject) => {
      api({
        ...userManagementApiVariables.getbyidUrl,
      })
        .then((data ) => {
          resolve(data)
        })
        .catch(({ message }) => {
          reject(toast.error(message))
        })
    })
  }

export const createUserApi =
  (body) =>
  (dispatch, getState, { api }) => {
    return new Promise((resolve, reject) => {
      api({
        ...userManagementApiVariables.createUserUrl,
        body,
      })
        .then((res ) => {
          console.log("data", res);
          console.log("message", res);
          resolve(res);
          toast.success(res.message);
        })
        .catch((err) => {
          reject(toast.error(err.message || err.error))
        })
    })
  }

export const EditUserApi =
  (body) =>
  (dispatch, getState, { api }) => {
    return new Promise((resolve, reject) => {
      api({
        ...userManagementApiVariables.editUserUrl,
        body,
      })
        .then(({ data, message }) => {
          resolve(data)
          toast.success(message)
        })
        .catch((err) => {
          reject(toast.error(err.message || err.error))
        })
    })
  }

export const deleteUserApi =
  (query) =>
  (dispatch, getState, { api }) => {
    userManagementApiVariables.deleteUserUrl.id = query.id
    return new Promise((resolve, reject) => {
      api({
        ...userManagementApiVariables?.deleteUserUrl,
      })
        .then((res) => {
          resolve(res);
          toast.success(res.message);
        })
        .catch((err) => {
          toast.error(err.message || "Something went wrong");
          reject(err); // Pass real error to caller
        });
        
    })
  }
