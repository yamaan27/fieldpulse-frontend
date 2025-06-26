import { taskApiVariables } from 'services/apiVariable/taskApiVariables'
import { addQuery } from 'services/helperFunctions'
import { toast } from 'react-toastify'

export const getAllTaskApi =
  (query) =>
  (dispatch, getState, { api }) => {
    addQuery(query, taskApiVariables.getAllTasks)
    return new Promise((resolve, reject) => {
      api({
        ...taskApiVariables.getAllTasks,
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
  export const updateTaskApi =
    (query, body) =>
    (dispatch, getState, { api }) => {
      addQuery(query, taskApiVariables.updateTaskUrl);

      taskApiVariables.updateTaskUrl.id = query.id;
      return new Promise((resolve, reject) => {
        api({
          ...taskApiVariables.updateTaskUrl,
          body,
        })
          .then((data, message) => {
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

export const getTaskbyidApi =
  (query) =>
  (dispatch, getState, { api }) => {
    taskApiVariables.getTaskbyidUrl.id = query.id
    return new Promise((resolve, reject) => {
      api({
        ...taskApiVariables.getTaskbyidUrl,
      })
        .then((data ) => {
          resolve(data)
        })
        .catch(({ message }) => {
          reject(toast.error(message))
        })
    })
  }
// export const getTaskbyUseridApi =
//   (query) =>
//   (dispatch, getState, { api }) => {
//     // taskApiVariables.getTaskbyUseridUrl.id = query.id;
//     addQuery(query, taskApiVariables.getTaskbyUseridUrl);
//     return new Promise((resolve, reject) => {
//       api({
//         ...taskApiVariables.getTaskbyUseridUrl,
//       })
//         .then((data) => {
//           resolve(data);
//         })
//         .catch(({ message }) => {
//           reject(toast.error(message));
//         });
//     })
//   }

export const getTaskbyUseridApi =
  (query) =>
  (dispatch, getState, { api }) => {
    console.log("🔍 Incoming query to getTaskbyUseridApi:", query);

    // ✅ Set the ID
    taskApiVariables.getTaskbyUseridUrl.id = query.id;

    const { id, ...queryWithoutId } = query;

    console.log(
      "🧹 Query without ID (to be passed to addQuery):",
      queryWithoutId
    );

    // ✅ Add query string values
    addQuery(queryWithoutId, taskApiVariables.getTaskbyUseridUrl);

    console.log("🌐 Final API object before request:", {
      ...taskApiVariables.getTaskbyUseridUrl,
      fullURL: taskApiVariables.getTaskbyUseridUrl.api, // debug final URL
    });

    return new Promise((resolve, reject) => {
      api({
        ...taskApiVariables.getTaskbyUseridUrl,
      })
        .then((data) => {
          resolve(data);
        })
        .catch(({ message }) => {
          reject(toast.error(message));
        });
    });
  };


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

export const editTaskApi =
  (query, body) =>
  (dispatch, getState, { api }) => {
    addQuery(query, taskApiVariables.editTask)
    return new Promise((resolve, reject) => {
      api({
        ...taskApiVariables.editTask,
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
