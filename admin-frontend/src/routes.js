import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/tables";
import Customer from "views/admin/customer"
import AdminController from "views/admin/admin";
import Service from "views/admin/service";
import NewJob from "views/admin/NewJob";

// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  MdHome,
  MdOutlineAdminPanelSettings,
  MdElectricalServices,
  MdSupervisedUserCircle,
  MdWork,
  MdQueue,
  MdMiscellaneousServices,
  MdPerson,
  MdLock,
} from "react-icons/md";


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
    icon: <MdOutlineAdminPanelSettings className="h-6 w-6" />,
    component: <AdminController/>,
    secondary: true,
  },
  {
    name: "Service Providers",
    layout: "/admin",
    path: "installers",
    icon: <MdElectricalServices className="h-6 w-6" />,
    component: <NFTMarketplace />,
    secondary: true,
  },
  {
    name: "Customers",
    layout: "/admin",
    path: "customers",
    icon: <MdSupervisedUserCircle className="h-6 w-6" />,
    component: <Customer />,
    secondary: true,
  },
  {
    name: "New Job",
    layout: "/admin",
    icon: <MdWork className="h-6 w-6" />,
    path: "newJob",
    component: <NewJob />,
  },

  {
    name: "Job Tickets",
    layout: "/admin",
    icon: <MdQueue className="h-6 w-6" />,
    path: "data-tables",
    component: <DataTables />,
  },


  {
    name: "Services",
    layout: "/admin",
    path: "service",
    icon: <MdMiscellaneousServices className="h-6 w-6" />,
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
