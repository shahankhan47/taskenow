/* eslint-disable */
import React, { useState } from "react";
import { HiX } from "react-icons/hi";
import { Navigate } from "react-router-dom";
import Links from "./componentsrtl/Links";
import routes from "routes.js";

const getNewRoutes = (setIsLoggedIn) => {
  const type = window.sessionStorage.getItem("type")
  const accesses = window.sessionStorage.getItem("access")
  if (type == null) {
    setIsLoggedIn(false);
    return
  }

  let newRoutes = [...routes]
  if (type === "super") {
    return newRoutes;
  }

  newRoutes = newRoutes.filter((tab) => {
    if (tab.name === "Service Providers" && accesses.includes("Technician"))
    return tab;
    else if (tab.name === "Customers" && accesses.includes("Customer"))
    return tab;
    else if (tab.name === "Job Tickets" && accesses.includes("Jobs"))
    return tab;
    else if (tab.name === "New Job" && accesses.includes("Jobs"))
    return tab;
    else if (tab.name === "Admins" && accesses.includes("Admin"))
    return tab;
    else if (tab.name === "Main Dashboard" || tab.name === "Services" || tab.name === "Sign Out")
    return tab;
  })
  return newRoutes;
}

const Sidebar = ({ open, onClose }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const newRoutes = getNewRoutes(setIsLoggedIn)

  return (!isLoggedIn ? (<Navigate to="/auth/sign-in" replace={true} />) : (
    <div
      className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
        open ? "translate-x-0" : "-translate-x-96"
      }`}
    >
      {/* {!isLoggedIn && <Navigate to="/auth/sign-in" replace={true} />} */}
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
