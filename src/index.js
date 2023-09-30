import React from 'react';
import{BrowserRouter} from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { ToastProvider } from 'react-toast-notifications';
import './styles/index.css';
import App from './App';
import { AuthProvider } from './Providers/AuthProvider';
import { ChatContextProvider } from './Providers/ChatProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastProvider autoDismiss autoDismissTimeout={5000} placement="top-left">
        <AuthProvider>
          <ChatContextProvider>
            <App />
          </ChatContextProvider>
        </AuthProvider>
      </ToastProvider> 
    </BrowserRouter>
  </React.StrictMode>
);


