import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import './utils/axios.js'
import { Provider } from 'react-redux'
import store from './store'
import './globalStyles.css'
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    {/*    <React.StrictMode>*/}
    <App />
    {/*    </React.StrictMode>*/}
  </Provider>
)

reportWebVitals()
