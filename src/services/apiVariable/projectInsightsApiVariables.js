import { generateQuery } from '../helperFunctions'

export const projectInsightsApiVariables = {
  getSummary: {
    api: "api/reports/summary",
    method: "get",
    baseURL: "auth",
  },
  getMonthlyReport: {
    api: "api/reports/monthly",
    method: "get",
    baseURL: "auth",
  },
  getAgentSummary: {
    api: "api/reports/agent-summary",
    method: "get",
    baseURL: "auth",
  },
  getAgentReportUrl: {
    url: "api/reports/agent/",
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
};
