import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Signup from './component/Signup/Signup';
import Login from './component/Login/Login';
import Dashboard from './component/DashboardContainer/Dashboard';
import NoteContainer from './component/NoteContainer/NoteContainer';
import ArchiveContainer from './component/ArchiveContainer/ArchiveContainer';
import TrashContainer from './component/TrashContainer/TrashContainer';
import Reminder from './component/Reminder/Reminder';
import AuthRoute from './component/ProtectedRoute/AuthRoute'; 
import ProtectedRoute from './component/ProtectedRoute/ProtectedRoute'; 

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthRoute>
        <Login />
      </AuthRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <AuthRoute>
        <Signup />
      </AuthRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true, 
        element: <Navigate to="notes" replace />,
      },
      {
        path: "notes",
        element: <NoteContainer />, 
      },
      {
        path: "archive",
        element: <ArchiveContainer />, 
      },
      {
        path: "trash",
        element: <TrashContainer />, 
      },
      {
        path: "reminder",
        element: <Reminder />, 
      },
    ],
  },
  {
    path: "*", 
    element: <Navigate to="/" replace />, 
  },
]);

export default function RoutingModule() {
  return <RouterProvider router={router} />;
}
