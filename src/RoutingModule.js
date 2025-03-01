import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './component/Login/Login';
import Signup from './component/Signup/Signup';
import NoteContainer from './component/NoteContainer/NoteContainer';
import Dashboard from './component/DashboardContainer/Dashboard';
import ArchiveContainer from './component/ArchiveContainer/ArchiveContainer';
import TrashContainer from './component/TrashContainer/TrashContainer';

export default function RoutingModule() {
  const route=createBrowserRouter([ 
    {
      path:"",
      element:<Login/>
    },
    {
      path:"signup",
      element:<Signup/>
    },
    {
      path:"dashboard",
      element:<Dashboard/>,
      children:[
        {
        path:"notes",
        element:<NoteContainer/>
      },
      {
        path:"archive",
        element:<ArchiveContainer/>
      },
      {
        path:"trash",
        element:<TrashContainer/>
      },
    ]
    },

  ]);
  return (
    <RouterProvider router={route}/>
  )
}