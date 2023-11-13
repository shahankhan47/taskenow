import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { getTechnicianData } from "data/api";
import { setCookie, getCookie } from "data/cookie";
import CreateTech from './CrT2';

let alreadyLoggedIn = false;
const type = getCookie("type");
if(type === "technician") {
  alreadyLoggedIn = true
}

export default function SignIn() {
  alreadyLoggedIn = false;
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isTechnician, setIsTechnician] = useState(false);
  const [selectedTechnician, setSelectedTechnician] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setSelectedTechnician(null);
    setIsModalOpen(false);
  };

  const onSubmit = async (event) => {
    const allTechnicians = (await getTechnicianData()).data;
    const technicianExist = allTechnicians.length > 0 ? allTechnicians.find(technician => {
      return technician.email?.toLowerCase() === email?.toLowerCase() && technician.password === password;
    }) : null;

    if (technicianExist) {
      setCookie("type", "technician", 15)
      setCookie("id", technicianExist._id, 15)
      setIsTechnician(true)
    }
    else {
      alert("You are not registered.")
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
          {(isTechnician || alreadyLoggedIn) && (
            <Navigate to="/admin" replace={true} />
          )}
          <button className="mt-10 linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
          onClick={onSubmit}>
            Sign In
          </button>
          <button className="mt-10 linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
          onClick={() => {setIsModalOpen(true)}}>
            Register
          </button>
          {isModalOpen && <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-gray-800 bg-opacity-70">
            <div className="bg-white p-4 rounded-lg w-1/2">
              <button
                onClick={handleCloseModal}
                className="absolute top-2 right-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Close
              </button>
              <CreateTech
                initialValues={selectedTechnician}
                onCancel={handleCloseModal}
              />
            </div>
          </div>}
      </div>
    </div>
  );
}
