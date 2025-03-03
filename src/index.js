import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/main.css';
import App from './App';
import { AuthProvider } from './components/Firebase/Auth';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

