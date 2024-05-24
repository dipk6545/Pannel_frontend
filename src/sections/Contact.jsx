import { useEffect, useState, useRef } from "react";
import { useRecoilValue } from "recoil";
import { tokenSelector } from "../recoil/selectors/selectors";
import { useRecoilState } from "recoil";
import { contactInfo, tokenState } from "../recoil/atoms/atoms";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

/**
 * Contact component
 * @returns {JSX.Element} The Contact component
 */
const Contact = () => {
  // State to store form values
  const [value, setValues] = useState({
    username: "",
    email: "",
    message: "",
  })
  // State to track agreement checkbox
  const [agreement, setArgreement] = useState(false);
  // Get token from Recoil state
  const [token, setTokenState] = useRecoilState(tokenState);
  // State to show loading spinner
  const [spinner, setSpinner] = useState(false);
  // State to store user information
  const [contact, setContact] = useRecoilState(contactInfo);
  // Navigation hook
  const navigate = useNavigate();
  // Function to update form values
  const hanndleValues = (e, name) => {
    setValues({ ...value, [name]: e.target.value });
  }
  // Authenticate user
  const fetchData = async () => {
    try {
      if (contact === undefined) {
        let response = await fetch("http://localhost:5000/api/auth/user", {
          method: "Get",
          headers: {
            "Authorization": localStorage.getItem("token"),
          },
          cache: 'default'
        });

        let res = await response.json();
        if (response.status === 200) {
          let user = res.user;
          setContact(user);
          toast.success("Verified");
          setTimeout(() => {
            setValues({
              username: user.username,
              email: user.email,
              message: "",
            });
            setSpinner(false);
          }, 2000);
        }
        else {
          const message = Object.values(res).join(", ");
          throw new Error(message);
        }
      }
      else {
        setValues({
          username: contact.username,
          email: contact.email,
          message: "",
        });
        setSpinner(false);
      }
    } catch (error) {
      toast.error(error.message);
      setTimeout(() => {
        setTokenState(undefined);
        navigate("/login");
      }, 2000);
    }
  }

  // Fetch user information on component mount
  useEffect(() => {
    if (token === undefined && localStorage.getItem("token") === null) {
      console.log('Inside contact useEffect if');
      toast.info("Please login to access this page");
      setSpinner(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
    else {
      console.log('Inside contact useEffect else');
      setSpinner(true);
      setTimeout(() => {
        fetchData();
      }, 1000);
    }
  }, [token])

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
        cache: "default",
      });
      let res = await response.json();
      if (response.status === 200) {
        setValues({
          username: value.username,
          email: value.email,
          message: "",
        });
        setArgreement(false);
        toast.success("Email sent successfully");
      } else {
        console.log(JSON.stringify(res));
        throw new Error(res.message || "Email sending failed");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section className="dark:bg-gray-900 text-white p-5">
      {spinner && <Spinner />}
      <h1 className="text-3xl font-bold mb-5 text-center">Contact Us</h1>
      <div className="container flex flex-col gap-9 lg:gap-20 items-center bg-white md:flex-row dark:bg-gray-900 m-auto">
        <img
          className="object-cover w-full rounded-lg h-96 md:h-auto md:w-1/2 md:rounded-s-lg"
          src="https://shorturl.at/stFW1"
          alt=""
        />
        <form className="w-full mx-auto">
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              onChange={(e) => hanndleValues(e, "email")}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="name@flowbite.com"
              value={value.email}
              required
            />
          </div>
          <div className="flex flex-col md:flex-row md:gap-4">
            <div className="mb-5 w-full">
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                onChange={(e) => hanndleValues(e, "username")}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required
                value={value.username}
              />
            </div>
          </div>

          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your message
          </label>
          <textarea
            id="message"
            rows="4"
            value={value.message}
            onChange={(e) => hanndleValues(e, "message")}
            className="block mb-5 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Leave a comment..."
          ></textarea>
          <div className="flex items-start mb-5">
            <div className="flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                checked={agreement}
                onChange={() => setArgreement(!agreement)}
                value=""
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
          <button
            type="submit"
            className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${agreement ? "" : "disabled:opacity-25 cursor-not-allowed"}`}
            disabled={!agreement}
            onClick={handleSubmit}
          >
            Send Email
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
