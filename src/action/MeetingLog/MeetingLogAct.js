import { taskApiVariables } from 'services/apiVariable/taskApiVariables'
import { addQuery } from 'services/helperFunctions'
import { toast } from 'react-toastify'

export const getAllMeetingsApi =
  (query) =>
  (dispatch, getState, { api }) => {
    addQuery(query, taskApiVariables.getAllMeetings)
    return new Promise((resolve, reject) => {
      api({
        ...taskApiVariables.getAllMeetings,
      })
        .then((data ) => {
          resolve(data)
        })
        .catch(({ message }) => {
          reject(toast.error(message))
        })
    })
  }

  export const addTaskApi =
    (query, body) =>
    (dispatch, getState, { api }) => {
      addQuery(query, taskApiVariables.addTaskUrl);


      return new Promise((resolve, reject) => {
        api({
          ...taskApiVariables.addTaskUrl,
          body,
        })
          .then((data, message ) => {
            resolve(data);
            toast.success(data.message);
          })
          .catch((error) => {
            console.error("[addTaskApi] API error:", error);
            const errMsg = error?.message || "Something went wrong";
            reject(errMsg);
            toast.error(errMsg);
          });
      });
    };

export const getMeetingbyidApi =
  (query) =>
  (dispatch, getState, { api }) => {
    taskApiVariables.getMeetingbyidUrl.id = query.id
    return new Promise((resolve, reject) => {
      api({
        ...taskApiVariables.getMeetingbyidUrl,
      })
        .then((data ) => {
          resolve(data)
        })
        .catch(({ message }) => {
          reject(toast.error(message))
        })
    })
  }

export const getStakeholdersApi =
  (query) =>
  (dispatch, getState, { api }) => {
    taskApiVariables.getStakeholdersUrl.id = query.id
    return new Promise((resolve, reject) => {
      api({
        ...taskApiVariables.getStakeholdersUrl,
      })
        .then(({ data }) => {
          resolve(data)
        })
        .catch(({ message }) => {
          reject(toast.error(message))
        })
    })
  }

export const getMeetingClientbyidApi =
  (body) =>
  (dispatch, getState, { api }) => {
    return new Promise((resolve) => {
      api({
        ...taskApiVariables.getMeetingClientIdUrl,
        body,
      })
        .then(({ data }) => {
          resolve(data)
          // toast.success(message)
        })
        .catch(() => {
          // reject(toast.error(message))
        })
    })
  }

export const isStakeholderExistsApi =
  (body) =>
  (dispatch, getState, { api }) => {
    return new Promise((resolve, reject) => {
      api({
        ...taskApiVariables.isStakeholderExistsUrl,
        body,
      })
        .then(({ data, message }) => {
          resolve(data)
          if (message === 'StakeHolder already exists with given email') {
            toast.success(message)
          }
        })
        .catch(({ message }) => {
          reject(toast.error(message))
        })
    })
  }

export const uploadImg =
  (body) =>
  (dispatch, getState, { api, Toast }) => {
    return new Promise((resolve, reject) => {
      api({
        ...taskApiVariables.upload,
        body,
      })
        .then((data) => {
          resolve(data)
        })
        .catch(({ message }) => {
          reject(Toast({ type: 'error', message }))
        })
    })
  }

export const editMeetingApi =
  (query, body) =>
  (dispatch, getState, { api }) => {
    addQuery(query, taskApiVariables.editMeeting)
    return new Promise((resolve, reject) => {
      api({
        ...taskApiVariables.editMeeting,
        body,
      })
        .then(({ data, message }) => {
          resolve(data)
          toast.success(message)
        })
        .catch(({ message }) => {
          reject(toast.error(message))
        })
    })
  }
