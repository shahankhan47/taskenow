import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { getAdminData } from "data/api";
import { setCookie, getCookie } from "data/cookie";

let alreadyLoggedIn = false;
const type = getCookie("type");
if(type === "super" || type === "admin") {
  alreadyLoggedIn = true
}

export default function SignIn() {
  alreadyLoggedIn = false;
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isAdmin, setIsAdmin] = useState(false);

  const onSubmit = async (event) => {
    const allAdmins = (await getAdminData()).data;
    const adminExist = allAdmins.length > 0 ? allAdmins.find(admin => {
      return admin.email?.toLowerCase() === email?.toLowerCase() && admin.password === password;
    }) : null;

    if (!adminExist) {
      if (email !== "admin" || password !== "admin") {
        alert("You are not authorized");
      }
      else {
        setCookie("type", "super", 15)
        setCookie("id", "superadmin", 15)
        setIsAdmin(true)
      }
    }
    else {
      setCookie("type", "admin", 15)
      setCookie("access", JSON.stringify(adminExist.access), 15)
      setCookie("id", adminExist._id, 15)
      setIsAdmin(true)
    }
  }

  const onEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const onPasswordChange = (event) => {
    setPassword(event.target.value)
  }

  return (
    <div className="mt-1 mb-1 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign in section */}
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Sign In
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Enter your email and password to sign in!
        </p>
        {/* Email */}
        <input
          type="text"
          id="email"
          name="email"
          onChange={onEmailChange}
          className="w-full text-sm border-b-2 border-gray-300 focus:border-brand-500 focus:outline-none rounded-md px-2 py-1"
        />

        {/* Password */}
        <input
          type="password"
          id="password"
          name="password"
          onChange={onPasswordChange}
          className="w-full mt-10 text-sm border-b-2 border-gray-300 focus:border-brand-500 focus:outline-none rounded-md px-2 py-1"
        />
        {/* Checkbox */}
          {(isAdmin || alreadyLoggedIn) && (
            <Navigate to="/admin" replace={true} />
          )}
          <button className="mt-10 linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
          onClick={onSubmit}>
            Sign In
          </button>
      </div>
    </div>
  );
}
