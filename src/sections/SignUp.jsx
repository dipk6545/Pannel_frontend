import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminState, tokenState, userState } from "../recoil/atoms/atoms";
import { useRecoilState } from "recoil";
import { toast } from "react-toastify";
/**
 * SignUp component for user registration
 */
const SignUp = () => {
  // Initialize state variables
  const navigate = useNavigate();
  const [agreement, setAgreement] = useState(false);
  const [u, setUserState] = useRecoilState(userState); // Set user state
  const [t, setTokenState] = useRecoilState(tokenState);
  const [_, setGlobalAdmin] = useRecoilState(adminState); // Set admin link state
  const [values, setValues] = useState({ username: "", email: "", password: "", repeatPassword: "", phone: "", isAdmin: false });

  /**
   * Handle change event for input fields
   * @param {Object} e - Event object
   * @param {string} name - Name of the input field
   */
  const handleChange = (e, name) => {
    const newValues = {
      ...values,
      [name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
    };
    setValues(newValues);
  };

  /**
   * Handle form submission for user registration
   * @param {Object} e - Event object
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, phone, isAdmin } = values;

    try {
      if (values.password !== values.repeatPassword) {
        throw new Error("Passwords do not match");
      }

      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
            phone,
            isAdmin,
          }),
          cache: "default",
        }
      );

      const res = await response.json();

      if (response.ok) {
        localStorage.setItem("token", res.token);
        console.log("res", res.isAdmin);
        setGlobalAdmin(res.isAdmin);
        setTokenState(res.token);
        setUserState(res);
        setValues({
          username: "",
          email: "",
          password: "",
          phone: "",
          isAdmin: false,
        });
        setAgreement(false);
        navigate("/");
        toast.success("Registered Successfully");
      } else {
        const message = Object.values(res).join(", ");
        throw new Error(message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="container m-auto md:p-10 flex  flex-col md:flex-row">
        <div
          className="md:w-1/2 p-5 flex items-center justify-center"
        >
          <img
            className="w-full md:rounded-s-lg rounded-lg"
            src="https://shorturl.at/stFW1"
            alt=""
            loading="lazy"
          />
        </div>
        <div className="md:w-1/2 p-5">
          <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-4xl text-center">
            Registration Form
          </h1>

          <form className="mx-auto w-full" onSubmit={handleSubmit}>
            <div className="mb-5 flex gap-5">
              <div className="w-1/2">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Username
                </label>
                <input
                  value={values.username}
                  onChange={(e) => handleChange(e, "username")}
                  type="text"
                  id="text"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  required
                />
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  value={values.email}
                  onChange={(e) => handleChange(e, "email")}
                  type="email"
                  id="email"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  required
                />
              </div>
            </div>
            <div className="mb-5 flex gap-5">
              <div className="w-1/2">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your password
                </label>
                <input
                  value={values.password}
                  onChange={(e) => handleChange(e, "password")}
                  type="password"
                  id="password"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  required
                />
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="repeat-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Repeat password
                </label>
                <input
                  type="password"
                  value={values.repeatPassword}
                  onChange={(e) => handleChange(e, "repeatPassword")}
                  id="confirm -password"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  required
                />
              </div>
            </div>
            <div className="mb-5">
              <label
                htmlFor="phone-number"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Phone Number
              </label>
              <input
                value={values.phone}
                onChange={(e) => handleChange(e, "phone")}
                type="number"
                id="number"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required
              />
            </div>
            <div className="flex gap-5">
              <div className="flex items-start mb-5">
                <div className="flex items-center h-5">
                  <input
                    id="Admin"
                    type="checkbox"
                    checked={values.isAdmin}
                    onChange={(e) => handleChange(e, "isAdmin")}
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                  />
                </div>
                <label
                  htmlFor="terms"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Assign me admin
                </label>
              </div>

              <div className="flex items-start mb-5">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={agreement}
                    onChange={(e) => {
                      setAgreement(e.target.checked);
                    }}
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                    required
                  />
                </div>
                <label
                  htmlFor="terms"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  I agree with the{" "}
                  <a
                    href="#"
                    className="text-blue-600 hover:underline dark:text-blue-500"
                  >
                    terms and conditions
                  </a>
                </label>
              </div>
            </div>
            <button
              type="submit"
              className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-75 ${agreement ? "" : "disabled:opacity-25 cursor-not-allowed"
                }`}
              disabled={!agreement}
            >
              Register new account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
