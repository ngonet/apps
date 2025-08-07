//import './index.css'
import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import AppWrapper from '@/components/AppWrapper';

import 'flatpickr/dist/flatpickr.min.css';
import 'jsvectormap/dist/css/jsvectormap.min.css';
import 'simplebar-react/dist/simplebar.min.css';
import '@/assets/scss/app.scss';

hydrateRoot(
  document.getElementById('root'),
  <StrictMode>
    <BrowserRouter>
    <AppWrapper>  
      <App />
    </AppWrapper>
    </BrowserRouter>
  </StrictMode>,
)
