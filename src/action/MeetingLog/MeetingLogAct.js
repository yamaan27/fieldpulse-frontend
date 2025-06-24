import { meetingLogApiVariables } from 'services/apiVariable/meetingLogApiVariables'
import { addQuery } from 'services/helperFunctions'
import { toast } from 'react-toastify'

export const getAllMeetingsApi =
  (query) =>
  (dispatch, getState, { api }) => {
    addQuery(query, meetingLogApiVariables.getAllMeetings)
    return new Promise((resolve, reject) => {
      api({
        ...meetingLogApiVariables.getAllMeetings,
      })
        .then((data ) => {
          resolve(data)
        })
        .catch(({ message }) => {
          reject(toast.error(message))
        })
    })
  }

export const addMeetingApi =
  (query, body) =>
  (dispatch, getState, { api }) => {
    addQuery(query, meetingLogApiVariables.addMeetingUrl)

    return new Promise((resolve, reject) => {
      api({
        ...meetingLogApiVariables.addMeetingUrl,
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
export const getMeetingbyidApi =
  (query) =>
  (dispatch, getState, { api }) => {
    meetingLogApiVariables.getMeetingbyidUrl.id = query.id
    return new Promise((resolve, reject) => {
      api({
        ...meetingLogApiVariables.getMeetingbyidUrl,
      })
        .then(({ data }) => {
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
    meetingLogApiVariables.getStakeholdersUrl.id = query.id
    return new Promise((resolve, reject) => {
      api({
        ...meetingLogApiVariables.getStakeholdersUrl,
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
        ...meetingLogApiVariables.getMeetingClientIdUrl,
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
        ...meetingLogApiVariables.isStakeholderExistsUrl,
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
        ...meetingLogApiVariables.upload,
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
    addQuery(query, meetingLogApiVariables.editMeeting)
    return new Promise((resolve, reject) => {
      api({
        ...meetingLogApiVariables.editMeeting,
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
