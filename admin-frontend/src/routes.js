import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/tables";
import Customer from "views/admin/customer"
import AdminController from "views/admin/admin";
import Service from "views/admin/service";

// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
} from "react-icons/md";
import Material from "views/admin/material";
import Labor from "views/admin/labor";
import NewJob from "views/admin/NewJob";


const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Admins",
    layout: "/admin",
    path: "admin_control",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <AdminController/>,
    secondary: true,
  },
  {
    name: "Installers",
    layout: "/admin",
    path: "installers",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <NFTMarketplace />,
    secondary: true,
  },
  {
    name: "Customers",
    layout: "/admin",
    path: "customers",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <Customer />,
    secondary: true,
  },
  {
    name: "New Job",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "newJob",
    component: <NewJob />,
  },

  {
    name: "Job Tickets",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "data-tables",
    component: <DataTables />,
  },


  {
    name: "Services",
    layout: "/admin",
    path: "service",
    icon: <MdLock className="h-6 w-6" />,
    component: <Service />,
  },
  
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
  },

  
];
export default routes;
