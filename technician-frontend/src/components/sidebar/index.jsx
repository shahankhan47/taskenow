/* eslint-disable */
import React, { useState } from "react";
import { HiX } from "react-icons/hi";
import { Navigate } from "react-router-dom";
import Links from "./componentsrtl/Links";
import routes from "routes.js";
import { getCookie } from "data/cookie";

const getNewRoutes = () => {
  const type = getCookie("type")
  if (type == null || type == "") {
    return null
  }
  return routes;
}

const Sidebar = ({ open, onClose }) => {
  const newRoutes = getNewRoutes()

  return (!newRoutes ? (<Navigate to="/auth/sign-in" replace={true} />) : (
    <div
      className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
        open ? "translate-x-0" : "-translate-x-96"
      }`}
    >
      <span
        className="absolute top-4 right-4 block cursor-pointer xl:hidden"
        onClick={onClose}
      >
        <HiX />
      </span>

      <div className={`mx-[56px] mt-[50px] flex items-center`}>
        <div className="mt-1 ml-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white">
          TaskeNow
        </div>
      </div>
      <div class="mt-[58px] mb-7 h-px bg-gray-300 dark:bg-white/30" />
      {/* Nav item */}

      <ul className="mb-auto pt-1">
        <Links routes={newRoutes} />
      </ul>
      {/* Nav item end */}
    </div>
  ))
};

export default Sidebar;
