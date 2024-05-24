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
import ErrorPage from "./sections/ErrorPage.jsx";
import { RecoilRoot } from "recoil";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Admin from "./sections/Admin.jsx";
import AdminUser from "./sections/AdminUser.jsx";
import AdminContacts from "./sections/AdminContacts.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/admin",
        element: <Admin />,
        children: [
          {
            path: "/admin/user",
            element: <AdminUser />,
          },
          {
            path: "/admin/contact",
            element: <AdminContacts />,
          }
        ]
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RecoilRoot>
    <RouterProvider router={router} />
    <ToastContainer position="top-center" autoClose={1500} limit={1} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss={false} draggable pauseOnHover={false} theme="colored" transition:Bounce />
    {/* Render the footer component */}
  </RecoilRoot>
);
