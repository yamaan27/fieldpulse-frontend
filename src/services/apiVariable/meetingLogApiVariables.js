import { generateQuery } from '../helperFunctions'

export const meetingLogApiVariables = {
  getAllMeetings: {
    url: 'api/tasks',
    method: 'get',
    baseURL: 'auth',
    query: {
      search: '',
      page: 1,
      pageSize: 10,
      sortbyClientName: '',
      sortby: '',
    },
    get api() {
      return this.url + generateQuery(this.query)
    },
    set addQuery({ key, payload }) {
      this.query[key] = payload
    },
  },
  addMeetingUrl: {
    url: 'meetings/createMeeting',
    method: 'post',
    baseURL: 'auth',
    query: {
      sendClient: null,
      sendInternal: null,
      submit: null,
    },
    get api() {
      return this.url + generateQuery(this.query)
    },
    set addQuery({ key, payload }) {
      this.query[key] = payload
    },
  },
  getMeetingbyidUrl: {
    url: 'meetings/specficMeeting/',
    method: 'get',
    baseURL: 'auth',
    id: null,
    get api() {
      return this.url + this.id
    },
  },
  getStakeholdersUrl: {
    url: 'meetings/getStakeholdersList/',
    method: 'get',
    baseURL: 'auth',
    id: null,
    query: {
      page: null,
      limit: null,
    },

    get api() {
      return this.url + this.id + generateQuery(this.query)
    },

    set addQuery({ key, payload }) {
      this.query[key] = payload
    },
  },
  getMeetingClientIdUrl: {
    api: 'meetings/getMeetingLog',
    method: 'post',
    baseURL: 'auth',
  },
  isStakeholderExistsUrl: {
    api: 'meetings/stakeholderExist',
    method: 'post',
    baseURL: 'auth',
  },
  upload: {
    api: 'meetings/upload',
    method: 'post',
    baseURL: 'auth',
  },
  editMeeting: {
    url: 'meetings/editMeeting',
    method: 'post',
    baseURL: 'auth',
    query: {
      sendClient: null,
      sendInternal: null,
      submit: null,
    },
    get api() {
      return this.url + generateQuery(this.query)
    },
    set addQuery({ key, payload }) {
      this.query[key] = payload
    },
  },
}
