import { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import Hamburger from "./Hamburger";
import { useRecoilState, useRecoilValue } from "recoil";
import { adminState, tokenState, userState } from "../recoil/atoms/atoms";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import { adminSelector } from "../recoil/selectors/selectors";

/**
 * Navbar component displays the navigation bar at the top of the page.
 * It handles user authentication and navigation.
 */
const Navbar = () => {
  // Array of links to display in the navbar
  const links = ["Home", "About", "Contact", "Services", "Admin", "SignUp", "Login"];
  // State for the classname of the navbar
  const [className, setClassname] = useState("hidden md:block w-full md:w-auto");
  // State for the token state
  const [token, setTokenState] = useRecoilState(tokenState);
  // State for the user state
  const [user, setUserState] = useRecoilState(userState);
  // State for the spinner visibility
  const [spinner, setSpinner] = useState(false);
  // State for the admin status
  const isAdmin = useRecoilValue(adminSelector);
  // State for the global admin status
  const [_, setGlobalAdmin] = useRecoilState(adminState);
  // Hook for navigating between routes
  const navigate = useNavigate();

  /**
   * Resize event handler that updates the classname state based on the window width.
   */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setClassname("hidden md:block w-full md:w-auto");
      } else {
        setClassname(className);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [className]);

  /**
   * Returns the active link style based on the isActive parameter.
   * @param {boolean} isActive - Indicates if the link is active
   * @returns {object} - The active link style
   */
  const activeLink = ({ isActive }) => (isActive ? { color: "Violet" } : {});

  /**
   * Handles the click event on the navbar links.
   * Logs out the user if the Logout link is clicked.
   * @param {object} e - The event object
   */
  const navLinkClick = async (e) => {
    if (e.target.innerHTML === "Logout") {
      localStorage.clear();
      toast.success("Logged out successfully");
      setTokenState(undefined);
      setUserState(undefined);
      setSpinner(true);
      setGlobalAdmin(false);
      setTimeout(() => {
        setSpinner(false);
      }, 1500);
    }
  };

  /**
   * Returns the navbar links as a list of NavLink components.
   * @returns {array} - The navbar links as a list of NavLink components
   */
  const getLinks = () => {
    return links.map((link, index) => {
      if (isAdmin && link === "Admin") {
        return (
          <li key={index + link}>
            <NavLink
              to={`/${link.toLowerCase()}`}
              style={activeLink}
              className={`block md:py-2 md:px-3 text-white hover:text-red-500 border border-slate-800 rounded-lg md:border-none my-2 py-2 hover:bg-gray-400 ${(link === "SignUp" || link === "Login") && token ? "hidden" : "block"
                }`}
              aria-current="page"
              onClick={link === "Logout" ? navLinkClick : undefined}
            >
              {link}
            </NavLink>
          </li>
        );
      } else if (!isAdmin && link === "Admin") {
        return null; // Skip rendering the "Admin" link
      }
      else {
        return (
          <li key={index + link}>
            <NavLink
              to={link === "Home" ? "" : `/${link.toLowerCase()}`}
              style={activeLink}
              className={`block md:py-2 md:px-3 text-white hover:text-red-500 border border-slate-800 rounded-lg md:border-none my-2 py-2 hover:bg-gray-400 ${(link === "SignUp" || link === "Login") && token ? "hidden" : "block"
                }`}
              aria-current="page"
              onClick={link === "Logout" ? navLinkClick : undefined}
            >
              {link}
            </NavLink>
          </li>
        );
      }
    });
  };

  return (
    <nav className="bg-white dark:bg-gray-900">
      {spinner && <Spinner />}
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Pannel
          </span>
        </Link>
        <Hamburger className={className} setClassname={setClassname} />
        <div id="hamburger" className={className}>
          <ul className="font-medium md:flex text-center">
            {getLinks()}
            {token && (
              <li>
                <NavLink
                  to="#"
                  className="md:py-2 md:px-3 text-white hover:text-red-500 border border-slate-800 rounded-lg md:border-none my-2 py-2 hover:bg-gray-400 block"
                  onClick={navLinkClick}
                >
                  Logout
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
