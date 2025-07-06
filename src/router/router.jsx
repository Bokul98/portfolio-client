import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import RootLayout from '../layouts/RootLayout';
import Home from '../pages/Home/Home/Home';
import About from '../pages/About/About';
import Portfolio from '../pages/Portfolio/Portfolio';
import ContactUs from '../pages/Contact/ContactUs';
import Login from '../pages/Login';
import Register from '../pages/Register';
import AuthLayout from '../layouts/AuthLayout';
import Profile from '../pages/Profile';
import Dashboard from '../pages/Dashboard/Dashboard';
import AddPortfolio from '../pages/Dashboard/AddPortfolio';
import MyProjects from '../pages/Dashboard/MyProjects';
import PrivateRoute from '../routes/PrivateRoute';
import NotFound from '../pages/NotFound/NotFound';
import ChatBot from '../pages/ChatBot/ChatBot';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "portfolio",
        element: <Portfolio />,
      },
      {
        path: "chatbot",
        element: <ChatBot />,
      },
      {
        path: "contact",
        element: <ContactUs />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "dashboard",
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        children: [
          {
            path: "add-portfolio",
            element: <AddPortfolio />
          },
          {
            path: "my-projects",
            element: <MyProjects />
          }
        ]
      }
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      }
    ]
  },
  {
    path: "*",
    element: <NotFound />
  }
]);