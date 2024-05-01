import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Calendar from './pages/calendar.js';
import Card from './pages/accueil.js'
import reportWebVitals from './reportWebVitals';
import ClassementPage from './pages/classementPage.js';
import PlayerStat from './components/player_stats.js';


const domNode = document.getElementById('root');
const root = createRoot(domNode);
const router = createBrowserRouter([
    {
      path: "effectif",
      element: <App />,
    },
    {
        path: "calendrier",
        element: <Calendar />,
      },
      {
        path: "",
        element: <Card />,
      },
      {
        path: "classement",
        element: <ClassementPage />,
      },
      {
        path: "effectif/:slug",
        element: <PlayerStat />,
      },
      {
        path: "/:slug",
        element: <PlayerStat />,
      },
  ]); 

root.render(<RouterProvider router={router} />);




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
