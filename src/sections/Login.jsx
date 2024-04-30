import { useState } from "react";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="container flex flex-col gap-9 lg:gap-20 items-center bg-white md:flex-row dark:bg-gray-900 m-auto">
        <img
          className="object-cover w-full rounded-lg h-96 md:h-auto md:w-1/2 md:rounded-s-lg transition duration-500 ease-in-out hover:scale-110"
          src="https://shorturl.at/stFW1"
          alt=""
        />
          <form className="mx-auto w-full">
            <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-4xl underline">
              Login
            </h1>
            <div className="mb-5 flex gap-5">
              <div className="w-1/2">
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
            </div>
            <div className="mb-5 flex gap-5">
              <div className="w-1/2">
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
            </div>
            <button
              type="submit"
              className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-75`}
            >
              Login
            </button>
          </form>
      </div>
    </div>
  );
};

export default Login;
