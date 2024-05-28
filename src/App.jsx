import React, { useCallback, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";
import { adminState, tokenState, userState } from "./recoil/atoms/atoms";
import { toast } from "react-toastify";
/**
 * App component is the main component of the application.
 * It handles authentication and rendering of other components.
 */
const App = () => {
  // State hooks for token state
  const [token, setTokenState] = useRecoilState(tokenState);
  const [user, setUserState] = useRecoilState(userState);
  const [isAdmin, setGlobalAdmin] = useRecoilState(adminState); // State for the global admin status

  /**
   * Verifies the token by making a request to the server.
   * If the token is valid, sets the user state.
   * If the token is invalid, displays an error message.
   */
  const verification = async () => {
    try {
      let response = await fetch("http://localhost:5000/api/auth/user", {
        method: "Get",
        headers: {
          "Authorization": localStorage.getItem("token"),
        },
        cache: 'default',
      });
      let res = await response.json();
      if (response.ok) {
        setUserState(res.user);

        setGlobalAdmin(res.user.isAdmin);
        if (token === undefined) {
          setTokenState(localStorage.getItem("token"));
          toast.success("Log in success");
        }


      }
      else {
        localStorage.clear();
        setGlobalAdmin(false);
        setTokenState(undefined);
        setUserState(undefined);
        throw new Error("Token Expired, please login" || "Error occurred");
      }
    } catch (error) {
      toast.error(error.message);
      setTokenState(undefined);
    }
  }

  /**
   * Runs when the component mounts.
   * Checks if there is a token in the local storage.
   * If there is, sets the token state and verifies the token.
   * If there is no token, displays a login message.
   */
  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      setTimeout(() => {
        // Verify the token
        verification();
      }, 1000);

    }
    else {
      // If there is no token, display a login message
      setGlobalAdmin(false);
      setTokenState(undefined);
      setUserState(undefined);
      toast.info("Please login");
    }
  }, [localStorage.getItem("token")])


  return (
    <>
      {/* Render the navbar component */}
      <Navbar />
      {/* Render the outlet component */}
      <Outlet />
      {/* Render the toast component */}
      <Footer />
    </>
  );
};

export default App;
