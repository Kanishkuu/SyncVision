import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/AuthContext'; 
import { ConversationProvider } from './context/ConversationContext.jsx';
import { SocketProvider } from './context/SocketContext.jsx';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={clientId}>
    <AuthProvider>
      <ConversationProvider>
        <SocketProvider>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </SocketProvider>
      </ConversationProvider>
    </AuthProvider>
  </GoogleOAuthProvider>
);
