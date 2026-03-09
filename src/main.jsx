import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { store } from './store/index.js'
import {Provider} from "react-redux"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>

    <App />

    </Provider>
  </StrictMode>,
)

const appLoader = document.getElementById('app-loader')

if (appLoader) {
  requestAnimationFrame(() => {
    appLoader.classList.add('is-hidden')
    setTimeout(() => appLoader.remove(), 260)
  })
}
