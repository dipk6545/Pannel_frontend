import React, { useCallback, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import Alert from "./components/Alert";
import { useRecoilState } from "recoil";
import { alertState, tokenState, userState } from "./recoil/atoms/atoms";
/**
 * App component is the main component of the application.
 * It handles authentication and rendering of other components.
 */
const App = () => {
  // State hooks for alert and token state
  const [_, setTokenState] = useRecoilState(tokenState);
  const [alert, setAlertState] = useRecoilState(alertState);
  const [user, setUserState] = useRecoilState(userState);

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
      if (response.status === 200) {
        console.log('Token verified', res.user);
        setUserState(res.user);
      }
      else {
        throw new Error("Token Expired, please login" || "Error occurred");
      }
    } catch (error) {
      setAlertState({ message: error.message, flag: false });
      setTimeout(() => {
        setAlertState({});
        setTokenState(undefined);
      }, 2000);
    }
  }

  /**
   * Runs when the component mounts.
   * Checks if there is a token in the local storage.
   * If there is, sets the token state and verifies the token.
   * If there is no token, displays a login message.
   */
  useEffect(() => {
    // Log message indicating that the App component is running
    console.log('I am app');

    // Check if there is a token in the local storage
    if (localStorage.getItem("token") !== null) {
      // Set the token state
      setTokenState(localStorage.getItem("token"))
      // Verify the token
      verification();
    }
    else {
      // If there is no token, display a login message
      setTimeout(() => {
        setAlertState({ message: "Please login", flag: false });
      }, 2000);
      // Clear the alert state after 3 seconds
      setTimeout(() => {
        setAlertState({});
      }, 3000)
    }
  },[])

  return (
    <>
      {/* Render the alert component */}
      <Alert />
      {/* Render the navbar component */}
      <Navbar />
      {/* Render the outlet component */}
      <Outlet />
      {/* Render the footer component */}
      <Footer />
    </>
  );
};

export default App;
