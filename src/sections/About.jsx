import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { userSelector } from "../recoil/selectors/selectors";

const About = () => {
  const user = useRecoilValue(userSelector);
  const email = user?.email || "Guest";

  return (
    <div className="bg-white dark:bg-gray-900 m-auto">
      <div className="container flex flex-col justify-between p-4 leading-normal bg-white dark:bg-gray-900 m-auto">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Hi, {email}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad aliquam saepe
          ullam laboriosam, ex enim ratione. Non accusantium sapiente quas earum
          tenetur fugiat quo quia, reiciendis veritatis obcaecati ea delectus
          suscipit aliquam ut ab? Perspiciatis facere dolorum reiciendis non, atque
          maiores itaque voluptate! Dicta dolorum suscipit mollitia cupiditate
          omnis quas architecto, alias voluptatem ea ratione perferendis culpa ut ad,
          quae praesentium nesciunt excepturi accusamus consequatur, consectetur autem
          hic esse nobis iste. Perspiciatis, quis rem dolore consequuntur nisi
          pariatur est! Omnis, quasi molestiae provident culpa aperiam repellendus
          error expedita at ab natus obcaecati voluptatibus rem dolorum deserunt
          assumenda quam animi numquam dolore repudiandae alias reiciendis? Dolorem
          tempora, laudantium repellendus veritatis modi tempore ipsam accusamus
          incidunt ducimus reprehenderit quasi. Soluta saepe, vero corrupti quibusdam eum
          asperiores alias, voluptatem magnam fugiat dolores cumque, assumenda
          et deleniti nihil doloremque tenetur aut explicabo fugit iure iste dicta
          eius nulla illo? Similique, ipsum? Sint labore repellat molestiae? Corporis,
          eligendi! Libero quidem eius, quas quo reiciendis, distinctio iste incidunt
          fugit consectetur culpa officia. Libero doloremque, ipsa nam eaque laborum
          maxime optio odio dolore, deleniti, eius dignissimos ea? Qui at doloribus
          deserunt magni voluptatum blanditiis dolores magnam animi cupiditate.
          Hic aut accusantium incidunt expedita eius soluta numquam cupiditate.
        </p>
      </div>
    </div>
  );
};

export default About;
