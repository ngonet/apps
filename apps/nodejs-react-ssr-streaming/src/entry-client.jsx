import './index.css'
import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter, useRoutes } from 'react-router-dom'
import { AppProvider } from './providers/app-provider'
import AppRoute from './config/app-route.jsx';

// bootstrap y css
import 'bootstrap'
import '@fortawesome/fontawesome-free/css/all.css'
import 'react-perfect-scrollbar/dist/css/styles.css'
import './scss/react.scss'
import 'bootstrap-social/bootstrap-social.css'

function App() {
  const element = useRoutes(AppRoute);

  return element;
}

hydrateRoot(
  document.getElementById('root'),
  <StrictMode>
    <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  </StrictMode>,
)