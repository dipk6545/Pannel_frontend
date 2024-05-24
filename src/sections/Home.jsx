import React from "react";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
/**
 * The Home component renders the homepage of the website.
 * It displays an image and a description of the website.
 * It also has two buttons: "Connect Now" and "Learn More".
 * The Card component is also rendered.
 *
 * @return {JSX.Element} The rendered Home component
 */
const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-gray-900">  {/* Container for the homepage */}
      <div className="container flex flex-col items-center md:gap-8 bg-white md:flex-row dark:bg-gray-900 max-w-screen-xl m-auto p-5 md:p-5">
        <img
          className="object-cover w-full rounded-lg h-96 md:h-auto md:w-1/2 md:rounded-s-lg"
          src="https://shorturl.at/stFW1"
          alt=""
          loading="lazy"
        />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Noteworthy technology acquisitions 2021
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Repellendus, illum. Provident dicta consectetur distinctio modi
            nobis alias facilis dignissimos itaque delectus error quia, placeat
            molestiae sunt, nemo quasi. Numquam quaerat sit aliquam sunt
            consequuntur quo, necessitatibus animi reprehenderit molestias alias
            asperiores, est exercitationem officia in autem tenetur qui quia id
            quisquam? Natus reiciendis quasi porro libero. Eligendi officia
            dolorem alias totam deserunt architecto ad? Consequuntur non facere
            necessitatibus! Aliquam quia quis dolorem perspiciatis est fugit
            ipsa voluptatum eveniet expedita.
          </p>
          <div className="flex gap-4">
            {["Connect Now", "Learn More"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={()=>navigate(item==="Connect Now" ? "/contact" : "/about")}
                className={`text-white ${item === "Connect Now"
                  ? "bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  : "bg-transparent hover:bg-gray-400 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none border"
                  }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
      <Card />
    </div>
  );
};

export default Home;
