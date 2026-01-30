import React from 'react';
import { Toaster } from 'react-hot-toast';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import useAuthRefresh from './hooks/useAuthRefresh';

import LoginPage from './features/auth/pages/LoginPage';
import ProtectedRoute from './routes/ProtectedRoute';
import AddEmployee from './features/users/pages/AddEmployee';
import AddAdmin from './features/users/pages/AddAdmin';
import Page404 from './components/Page404';

import AddProject from './features/project/pages/AddProject';
import AddReport from './features/report/pages/AddReport';
import EditUser from './features/users/pages/EditUser';

import AssignReviewer from './features/review/pages/AssignReviewer';
import AssginedReviews from './features/review/pages/AssignedReviews';

import UserLayout from './layouts/UserLayout';
import EmployeeDashboard from './features/employee/pages/Dashboard';

import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './features/admin/pages/Dashboard';

import SuperAdminLayout from './layouts/SuperAdminLayout';
import SuperDashboard from './features/superadmin/pages/Dashboard';
import EditReviewForm from './features/review/components/EditReviewForm';


function App() {

  useAuthRefresh();

  const router = createBrowserRouter([
    { path: '/', element: <LoginPage />, errorElement: <Page404 /> },
    {
      path: '/employee',
      element: <ProtectedRoute allowedRoles={['employee']} />, // checks auth
      children: [
        {
          element: <UserLayout />,   // layout wraps all employee pages
          children: [
            { path: 'dashboard', element: <EmployeeDashboard /> },
            { path: 'edit-account', element: <EditUser /> },
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
            { path: 'add-employee', element: <AddEmployee /> },
            { path: 'add-project', element: <AddProject /> },
            { path: 'add-report/:id', element: <AddReport /> },
            { path: 'add-review', element: <AssignReviewer /> },
            { path: 'assigned-reviews', element: <AssginedReviews /> },
            { path: 'edit-review/:id', element: <EditReviewForm /> },
            { path: 'edit-account', element: <EditUser /> },
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
            { path: 'add-admin', element: <AddAdmin /> },
            { path: 'add-employee', element: <AddEmployee /> },
            { path: 'add-project', element: <AddProject /> },
            { path: 'add-review', element: <AssignReviewer /> },
            { path: 'edit-account', element: <EditUser /> },
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