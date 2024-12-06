import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import WebApp from '@twa-dev/sdk'

WebApp.ready();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
