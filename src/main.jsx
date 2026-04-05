import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#16161F',
            color: '#C8C8E0',
            border: '1px solid #1E1E2E',
            borderRadius: '10px',
            fontFamily: '"Outfit", sans-serif',
            fontSize: '14px',
          },
          success: { iconTheme: { primary: '#BFFF00', secondary: '#050507' } },
          error:   { iconTheme: { primary: '#FF4466', secondary: '#050507' } },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
);