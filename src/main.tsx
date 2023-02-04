import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import App from './App';
import './index.css';

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import GlobalStyle from './GlobalStyle';

const {
  VITE_APP_FIREBASE_API_KEY,
  VITE_APP_FIREBASE_AUTH_DOMAIN,
  VITE_APP_FIREBASE_PROJECT_ID,
  VITE_APP_FIREBASE_STORAGE_BUCKET,
  VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
  VITE_APP_FIREBASE_APP_ID,
  VITE_APP_FIREBASE_MEASUREMENT_ID,
} = import.meta.env;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
);

const firebaseConfig = {
  apiKey: VITE_APP_FIREBASE_API_KEY,
  authDomain: VITE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: VITE_APP_FIREBASE_PROJECT_ID,
  storageBucket: VITE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: VITE_APP_FIREBASE_APP_ID,
  measurementId: VITE_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
