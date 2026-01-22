import React from 'react';
import { Toaster } from 'react-hot-toast';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import LoginPage from './features/auth/pages/LoginPage';


function App() {


  const router = createBrowserRouter([
    { path: '/', element: <LoginPage /> },
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