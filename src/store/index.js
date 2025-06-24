import { configureStore } from "@reduxjs/toolkit";
import { reducers } from "reducer";
import { api } from "services/api";
import { Toast } from "services/toast";

// Create store with Redux Toolkit
export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: { api, Toast },
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

// History
export const history = require("history").createBrowserHistory();
