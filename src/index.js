// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import * as serviceWorkerRegistration from './serviceWorkerRegistration'
// import { store } from './store'
// import { Provider } from 'react-redux'
// import AppRoutes from './routes'
// import { BrowserRouter } from 'react-router-dom'
// import { StyleProvider } from 'components/common/StyleProvider'

// const root = ReactDOM.createRoot(document.getElementById('root'))

// root.render(
//   <Provider store={store}>
//     <BrowserRouter>
//       <React.StrictMode>
//         <StyleProvider>
//           <AppRoutes />
//         </StyleProvider>
//       </React.StrictMode>
//     </BrowserRouter>
//   </Provider>
// )

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://cra.link/PWA
// serviceWorkerRegistration.unregister()


import React from "react";
import ReactDOM from "react-dom/client";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { store } from "./store";
import { Provider } from "react-redux";
import AppRoutes from "./routes";
import { BrowserRouter } from "react-router-dom";
import { StyleProvider } from "components/common/StyleProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./toastOverrides.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <StyleProvider>
          <AppRoutes />
          {/* <ToastContainer theme="colored" /> */}
          <ToastContainer
            theme="colored"
            position="top-right"
            autoClose={3000}
            // hideProgressBar
            closeOnClick
            pauseOnHover
            draggable
            limit={2}
            style={{
              fontSize: window.innerWidth < 600 ? "14px" : "16px",
              padding: "10px 16px",
              borderRadius: "16px !important",
              ".Toastify__toast": {
                borderRadius: "16px !important",
              },
            }}
            sx={{
              ".Toastify__toast": {
                borderRadius: "16px !important",
              },
              fontSize: window.innerWidth < 600 ? "14px" : "16px",
              padding: "10px 16px",
            }}
          />
        </StyleProvider>
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();
