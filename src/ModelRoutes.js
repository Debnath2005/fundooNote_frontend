import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Dashboard from './components/Dashboard/Dashboard';
import ArchiveContainer from './components/ArchiveContainer/ArchiveContainer';
import TrashContainer from './components/TrashContainer/TrashContainer';
import NoteContainer from './components/NoteContainer/NoteContainer';

const ModelRoutes = () => {
    const appRoute=createBrowserRouter([
        {
            path:'',
            element:<Login/>
        },
        {
            path:'signup',
            element:<SignUp/>
        },
        {
          path:'Dashboard',
          element:<Dashboard/>,
          children:[
            {
              path:'notes',
              element:<NoteContainer/>
            },
            {
              path:'archive',
              element:<ArchiveContainer/>
            },
            {
              path:'trash',
              element:<TrashContainer/>
            }
          ]
        },
        {
          future: {
            v7_startTransition: true,
            v7_relativeSplatPath: true,
            v7_fetcherPersist: true,
            v7_normalizeFormMethod: true,
            v7_partialHydration: true,
            v7_skipActionErrorRevalidation: true,
          },
        }
    ])
  return (
    <RouterProvider router={appRoute}/>
  )
}

export default ModelRoutes