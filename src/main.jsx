import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./sections/Home.jsx";
import About from "./sections/About.jsx";
import Contact from "./sections/Contact.jsx";
import Services from "./sections/Services.jsx";
import Login from "./sections/Login.jsx";
import SignUp from "./sections/SignUp.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element:<Home/>
      },
      {
        path: "/about",
        element: <About/>
      },
      {
        path:"/contact",
        element: <Contact />
      },
      {
        path:"/services",
        element: <Services />
      },
      {
        path:"/login",
        element: <Login />
      },
      {
        path:"/signup",
        element: <SignUp />
      }
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
