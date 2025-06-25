import { projectInsightsApiVariables } from 'services/apiVariable/projectInsightsApiVariables'
import { addQuery } from 'services/helperFunctions'
import { toast } from 'react-toastify'

export const summaryApi =
   (query) =>
    (dispatch, getState, { api }) => {
      addQuery(query, projectInsightsApiVariables.getSummary);
  
      return new Promise((resolve, reject) => {
        api({
          ...projectInsightsApiVariables.getSummary,
        })
          .then((data) => {
            resolve(data);
          })
          .catch(({ message }) => {
            reject(toast.error(message));
          });
      })
    }

export const monthlyReportApi =
   (query) =>
    (dispatch, getState, { api }) => {
      addQuery(query, projectInsightsApiVariables.getMonthlyReport);
  
      return new Promise((resolve, reject) => {
        api({
          ...projectInsightsApiVariables.getMonthlyReport,
        })
          .then((data) => {
            resolve(data);
          })
          .catch(({ message }) => {
            reject(toast.error(message));
          });
      })
    }
export const getAgentsummaryApi =
   (query) =>
    (dispatch, getState, { api }) => {
      addQuery(query, projectInsightsApiVariables.getAgentSummary);
  
      return new Promise((resolve, reject) => {
        api({
          ...projectInsightsApiVariables.getAgentSummary,
        })
          .then((data) => {
            resolve(data);
          })
          .catch(({ message }) => {
            reject(toast.error(message));
          });
      })
    }

    export const getAgentReportApi =
      (query) =>
      (dispatch, getState, { api }) => {
        projectInsightsApiVariables.getAgentReportUrl.id = query.id;
        return new Promise((resolve, reject) => {
          api({
            ...projectInsightsApiVariables.getAgentReportUrl,
          })
            .then((data) => {
              resolve(data);
            })
            .catch(({ message }) => {
              reject(toast.error(message));
            });
        })
      }
