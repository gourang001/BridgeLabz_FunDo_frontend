import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Signup from './component/Signup/Signup';
import Login from './component/Login/Login';
import Dashboard from './component/DashboardContainer/Dashboard';
import NoteContainer from './component/NoteContainer/NoteContainer';
import ArchiveContainer from './component/ArchiveContainer/ArchiveContainer';
import TrashContainer from './component/TrashContainer/TrashContainer';
import Reminder from './component/Reminder/Reminder';
import AuthRoute from './component/ProtectedRoute/AuthRoute'; // Import AuthRoute
import ProtectedRoute from './component/ProtectedRoute/ProtectedRoute'; // Import ProtectedRoute

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
        index: true, // Default child route
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
    path: "*", // Fallback for invalid routes
    element: <Navigate to="/" replace />, 
  },
]);

export default function RoutingModule() {
  return <RouterProvider router={router} />;
}
// import React from 'react'
// import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import Login from './component/Login/Login';
// import Signup from './component/Signup/Signup';
// import NoteContainer from './component/NoteContainer/NoteContainer';
// import Dashboard from './component/DashboardContainer/Dashboard';
// import ArchiveContainer from './component/ArchiveContainer/ArchiveContainer';
// import TrashContainer from './component/TrashContainer/TrashContainer';
// import Reminder from './component/Reminder/Reminder';
// import Lable from './component/Lable/Lable';

// export default function RoutingModule() {
//   const route=createBrowserRouter([ 
//     {
//       path:"",
//       element:<Login/>
//     },
//     {
//       path:"signup",
//       element:<Signup/>
//     },
//     {
//       path:"dashboard",
//       element:<Dashboard/>,
//       children:[
//         {
//         path:"notes",
//         element:<NoteContainer/>
//       },
//       {
//         path:"archive",
//         element:<ArchiveContainer/>
//       },
//       {
//         path:"trash",
//         element:<TrashContainer/>
//       },
//       {
//         path:"reminder",
//         element:<Reminder/>
//       },
//       {
//         path:"lable",
//         element:<Lable/>
//       },
//     ]
//     },

//   ]);
//   return (
//     <RouterProvider router={route}/>
//   )
// }