import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminState, tokenState, userState } from "../recoil/atoms/atoms";
import { useRecoilState } from "recoil";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

// Login component renders a form that allows a user to log in to the application.
const Login = () => {
  const navigate = useNavigate();
  const [u, setUserState] = useRecoilState(userState);
  const [t, setTokenState] = useRecoilState(tokenState);
  const [spin, setSpin] = useState(false);
  const [_, setGlobalAdmin] = useRecoilState(adminState); // State for the global admin status
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  // This function is the event handler for the form submission.
  // It prevents the default form submission behavior and
  // makes a POST request to the backend to attempt to authenticate
  // the user.
  const handleSubmit = async (e) => {
    e.preventDefault();
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
        localStorage.setItem("token", res.token);
        setValues({ email: "", password: "" });
        toast.success("Successfully logged in");
        setGlobalAdmin(res.isAdmin);
        setTokenState(res.token);
        setUserState(res);
        navigate("/");
      } else {
        let message = "";
        Object.entries(res).forEach(([key, value]) => {
          message += Object.keys(res).length > 1 ? value + ", " : value;
        });
        throw new Error(message);
      }
    } catch (error) {
      toast.warning(error.message);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      {spin && <Spinner />}
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
                onChange={(e) => setValues({ ...values, email: e.target.value })}
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
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required
              />
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-75"
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

