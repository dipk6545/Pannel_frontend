import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { alertState, tokenState, userState } from "../recoil/atoms/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import Spinner from "../components/Spinner";

/**
 * This is the Login component. It is a stateless functional component.
 * It renders a form that allows a user to log in to the application.
 * When the form is submitted, it makes a POST request to the backend
 * to attempt to authenticate the user. If the user is successfully
 * authenticated, the user is redirected to the root route "/".
 * If the user is not successfully authenticated, the response JSON
 * is parsed and the error message is extracted from it and set as the
 * alert state. The alert state is cleared after 2 seconds.
 */
const Login = () => {
  const navigate = useNavigate();
  const [alert, setAlertState] = useRecoilState(alertState);
  const [user, setUserState] = useRecoilState(userState);
  const [token, setTokenState] = useRecoilState(tokenState);
  const [spin, setSpin] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  /**
   * This function is the event handler for the form submission.
   * It prevents the default form submission behavior and
   * makes a POST request to the backend to attempt to authenticate
   * the user.
   * @param {Event} e The event object representing the form submission.
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent the default form submission behavior
    try {
      let response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        cache: "default",
      });
      let res = await response.json();
      if (response.status === 200) {
        setTokenState(res.token);
        localStorage.setItem("token", res.token);
        setUserState(res);
        setValues({
          email: "",
          password: "",
        });
        setAlertState({ message: "Successfully logged in", flag: true });
        setTimeout(() => {
          navigate("/");
          setAlertState({});
        }, 2000);
      } else {
        let message = "";
        Object.entries(res).forEach(([key, value]) => {
          message += Object.keys(res).length > 1 ? value + ", " : value;
        });
        setAlertState({ message, flag: false });
        setTimeout(() => {
          setAlertState({});
        }, 2000);
      }
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      {
        spin && <Spinner />
      }
      <div className="container flex flex-col items-center md:gap-8 bg-white md:flex-row dark:bg-gray-900 max-w-screen-xl m-auto p-5 md:p-5">
        <img
          className="object-cover w-full rounded-lg h-96 md:h-auto md:w-1/2 md:rounded-s-lg"
          src="https://shorturl.at/stFW1"
          alt=""
        />
        <div className="w-full ">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-4xl text-center mb-10 relative top-0">
            Login
          </h1>
          <form className="mx-auto" onSubmit={handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                value={values.email}
                type="text"
                id="text"
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
                placeholder="xyz@abc.com"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                value={values.password}
                type="password"
                id="password"
                onChange={(e) => {
                  setValues({ ...values, password: e.target.value });
                }}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required
              />
            </div>
            <button
              type="submit"
              onSubmit={handleSubmit}
              className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-75`}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
