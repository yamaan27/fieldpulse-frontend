import React from 'react'
import ReactDOM from 'react-dom/client'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import { store } from './store'
import { Provider } from 'react-redux'
import AppRoutes from './routes'
import { BrowserRouter } from 'react-router-dom'
import { StyleProvider } from 'components/common/StyleProvider'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <StyleProvider>
          <AppRoutes />
        </StyleProvider>
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister()
