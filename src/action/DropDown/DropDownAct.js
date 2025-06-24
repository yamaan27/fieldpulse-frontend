import { dropDownApi } from 'services/apiVariables'
import { addQuery } from 'services/helperFunctions'
import { toast } from 'react-toastify'


export const getAgentsApi =
  (query) =>
  (dispatch, getState, { api }) => {
    addQuery(query, dropDownApi.getAgents);

    return new Promise((resolve, reject) => {
      api({
        ...dropDownApi.getAgents,
      })
        .then((data ) => {
          resolve(data);
        })
        .catch(({ message }) => {
          reject(toast.error(message));
        });
    })
  }
