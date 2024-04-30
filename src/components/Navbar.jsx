import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import Hamburger from "./Hamburger";

const Navbar = () => {
  const links = ["Home", "About", "Contact", "Services", "Login", "SignUp"];
  const [className, setClassname] = useState("hidden md:block w-full md:w-auto");
  useEffect(()=>{
    window.addEventListener("resize", ()=>{
      console.log(className);
      if(window.innerWidth>768){
        setClassname("hidden md:block w-full md:w-auto");
      }
      else{
        setClassname(className);
      }
    })
    
  }, [className])
  const activeLink = ({ isActive }) => {
    return isActive ? { color: "Violet" } : {};
  };
  return (
    <nav className="bg-white dark:bg-gray-900">
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
            {links.map((link, index) => (
              <li key={index + link}>
                <NavLink
                  to={link == "Home" ? "" : `/${link}`}
                  style={activeLink}
                  className="block md:py-2 md:px-3 text-white hover:text-red-500 border border-slate-800 rounded-lg md:border-none my-2 py-2 hover:bg-gray-400"
                  aria-current="page"
                >
                  {link}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
