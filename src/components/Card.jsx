import React from "react";

const Card = () => {
  const value = {
    "Developer": "73M+",
    "Public repositories": "100M+",
    "Open source projects": "1000s",
    "Contributors": "1B+",
    "Top Forbes companies": "90+",
    "Organizations": "4M+",
  };
  return (
    <div
      className="p-4 bg-white dark:bg-gray-900"
      id="stats"
      role="tabpanel"
      aria-labelledby="stats-tab"
    >
      <dl className="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-6 dark:text-white sm:p-8">
        {Object.entries(value).map(([key, value]) => (
          <div
            key={key}
            className="flex flex-col items-center justify-center"
          >
            <dt className="mb-2 text-3xl font-extrabold">{value}</dt>
            <dd className="font-light text-gray-500 dark:text-gray-400">
              {key}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default Card;
