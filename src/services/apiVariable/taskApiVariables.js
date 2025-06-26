import { generateQuery } from '../helperFunctions'

export const taskApiVariables = {
  getAllTasks: {
    url: "api/tasks",
    method: "get",
    baseURL: "auth",
    query: {
      search: "",
      page: 1,
      pageSize: 10,
      sortbyClientName: "",
      sortby: "",
    },
    get api() {
      return this.url + generateQuery(this.query);
    },
    set addQuery({ key, payload }) {
      this.query[key] = payload;
    },
  },
  addTaskUrl: {
    url: "api/tasks",
    method: "post",
    baseURL: "auth",
    query: {
      sendClient: null,
      sendInternal: null,
      submit: null,
    },
    get api() {
      return this.url + generateQuery(this.query);
    },
    set addQuery({ key, payload }) {
      this.query[key] = payload;
    },
  },
  updateTaskUrl: {
    url: "api/tasks/taskId/",
    method: "put",
    baseURL: "auth",
    id: null,
    query: {
      sendClient: null,
      sendInternal: null,
      submit: null,
    },
    get api() {
      return this.url + this.id + generateQuery(this.query);
    },
    set addQuery({ key, payload }) {
      this.query[key] = payload;
    },
  },
  getTaskbyidUrl: {
    url: "api/tasks/taskId/",
    method: "get",
    baseURL: "auth",
    id: null,
    get api() {
      return this.url + this.id;
    },
  },
  getTaskbyUseridUrl: {
    url: "api/tasks/user/",
    method: "get",
    baseURL: "auth",
    id: null,
    // get api() {
    //   return this.url + this.id;
    // },
    query: {
      filter: null,
    },
    get api() {
      return this.url + this.id + generateQuery(this.query);
    },
    set addQuery({ key, payload }) {
      this.query[key] = payload;
    },
  },
  getStakeholdersUrl: {
    url: "meetings/getStakeholdersList/",
    method: "get",
    baseURL: "auth",
    id: null,
    query: {
      page: null,
      limit: null,
    },

    get api() {
      return this.url + this.id + generateQuery(this.query);
    },

    set addQuery({ key, payload }) {
      this.query[key] = payload;
    },
  },
  getMeetingClientIdUrl: {
    api: "meetings/getMeetingLog",
    method: "post",
    baseURL: "auth",
  },
  isStakeholderExistsUrl: {
    api: "meetings/stakeholderExist",
    method: "post",
    baseURL: "auth",
  },
  upload: {
    api: "meetings/upload",
    method: "post",
    baseURL: "auth",
  },
  editTask: {
    url: "meetings/editTask",
    method: "post",
    baseURL: "auth",
    query: {
      sendClient: null,
      sendInternal: null,
      submit: null,
    },
    get api() {
      return this.url + generateQuery(this.query);
    },
    set addQuery({ key, payload }) {
      this.query[key] = payload;
    },
  },
};
