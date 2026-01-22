import React from 'react';
import { Toaster } from 'react-hot-toast';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import useAuthRefresh from './hooks/useAuthRefresh';

import LoginPage from './features/auth/pages/LoginPage';
import ProtectedRoute from './routes/ProtectedRoute';

import UserLayout from './layouts/UserLayout';
import EmployeeDashboard from './features/employee/pages/Dashboard';

import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './features/admin/pages/Dashboard';

import SuperAdminLayout from './layouts/SuperAdminLayout';
import SuperDashboard from './features/superadmin/pages/Dashboard';


function App() {

  useAuthRefresh();
  
  const router = createBrowserRouter([
    { path: '/', element: <LoginPage /> },
    {
      path: '/employee',
      element: <ProtectedRoute allowedRoles={['employee']} />, // checks auth
      children: [
        {
          element: <UserLayout />,   // layout wraps all employee pages
          children: [
            { path: 'dashboard', element: <EmployeeDashboard /> },
          ]
        }
      ]
    },
    {
      path: '/admin',
      element: <ProtectedRoute allowedRoles={['admin']} />, // checks auth
      children: [
        {
          element: <AdminLayout />,   // layout wraps all admin pages
          children: [
            { path: 'dashboard', element: <AdminDashboard /> },
          ]
        }
      ]
    },
    {
      path: '/superadmin',
      element: <ProtectedRoute allowedRoles={["super-admin"]} />, // checks auth
      children: [
        {
          element: <SuperAdminLayout />, // layout wraps all superadmin pages
          children: [
            { path: 'dashboard', element: <SuperDashboard /> },
          ]
        }
      ]
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: { fontSize: '14px' },
        }}
      />
    </>
  )
}

export default App