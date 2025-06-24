import { generateQuery } from '../helperFunctions'
export const userManagementApiVariables = {
  getAllUsersUrl: {
    url: 'api/users',
    method: 'get',
    baseURL: 'auth',
    query: {
      page: 1,
      pageSize: 10,
      username: '',
    },

    get api() {
      return this.url + generateQuery(this.query)
    },

    set addQuery({ key, payload }) {
      this.query[key] = payload
    },
  },
  getbyidUrl: {
    url: 'api/users/',
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
  createUserUrl: {
    api: 'api/users',
    method: 'post',
    baseURL: 'auth',
  },
  editUserUrl: {
    api: 'admin/editUser',
    method: 'put',
    baseURL: 'auth',
  },
  deleteUserUrl: {
    url: 'api/users/',
    method: 'delete',
    baseURL: 'auth',
    id: null,
    get api() {
      return this.url + this.id
    },
  },
}
