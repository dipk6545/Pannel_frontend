import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import Alert from "./components/Alert";
const App = () => {
  const [text, setText] = useState(undefined);
  return (
    <>
        <Alert />
        <Navbar />
        <Outlet />
        <Footer />
    </>
  );
};

export default App;
