
import avatar from "assets/img/avatars/avatar7.png";
import banner from "assets/img/profile/banner.png";

import React from "react";
import Card from "components/card";

const Banner = () => {
  const { bannerImage, avatar, name, position, rating } = profileData;

  return (
    <Card extra={"items-center w-full h-full p-[16px] bg-cover"}>
      {/* Background and profile */}
      <div
        className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover"
        style={{ backgroundImage: `url(${bannerImage})` }}
      >
        <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
          <img className="h-full w-full rounded-full" src={avatar} alt="" />
        </div>
      </div>

      {/* Name and position */}
      <div className="mt-16 flex flex-col items-center">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          {name}
        </h4>
        <p className="text-base font-normal text-gray-600">{position}</p>
      </div>

      {/* Post followers */}
      <div className="mt-6 mb-3 flex gap-4 md:!gap-14">
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-navy-700 dark:text-white">
            {rating}
          </p>
          <p className="text-sm font-normal text-gray-600">Rating</p>
        </div>
        {/* <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-navy-700 dark:text-white">
            {followers}
          </p>
          <p className="text-sm font-normal text-gray-600">Access </p>
        </div> */}
       
      </div>
    </Card>
  );
};

export default Banner;



const profileData = {
  bannerImage: banner,
  avatar: avatar,
  name: "Lisa Parkson",
  position: "Technician",
  rating: 2
};
