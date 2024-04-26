import React from "react";

const Home = () => {
  return (
    <>
      <div class="flex flex-col items-center bg-white md:flex-row dark:bg-gray-900 py-10">
        <img
          class="object-cover w-full rounded-lg h-96 md:h-auto md:w-1/2 md:rounded-s-lg"
          src="https://shorturl.at/stFW1"
          alt=""
        />
        <div class="flex flex-col justify-between p-4 leading-normal">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Noteworthy technology acquisitions 2021
          </h5>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
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
            {["Connect Now", "Learn More"].map((item)=><button key={item}
              type="button"
              class={`text-white ${item==="Connect Now"?"bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              :"bg-transparent hover:bg-gray-400 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none border"}`}
            >{item}</button>)}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
