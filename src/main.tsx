import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import EditorPage from './pages/editor/EditorPage';
import './index.css';

import GlobalStyle from './GlobalStyle';
import LoginPage from './pages/login/LoginPage';
import AdminPage from './pages/admin/AdminPage';
import HomePage from './pages/home/HomePage';
import IndexPage from './pages/index/IndexPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <IndexPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/home',
    element: <HomePage />
  },
  {
    path: '/editor/:documentId',
    element: <EditorPage />,
  },
  {
    path: '/admin',
    element: <AdminPage />
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GlobalStyle />
    <RouterProvider router={router} />
  </React.StrictMode>,
);
