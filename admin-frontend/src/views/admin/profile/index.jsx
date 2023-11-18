import React, {useEffect, useState} from "react";
import Banner from "./components/Banner";
import General from "./components/General";
import { getSpecificAdminData } from "data/api";
import { getCookie } from "data/cookie";

const adminData = {
  access: ["Super"],
  addressLine1: "super",
  addressLine2: "",
  city: "super",
  description: "This is super admin. Details  below are hardcoded.",
  email: "super@admin.com",
  firstName: "super",
  heirarchy: "0",
  lastName: "admin",
  password: "",
  phoneNumber: "1234567890",
  sequence_number: "0",
  state: "super",
  taskNow_unique_id: "none",
  zip: "00000"
}

const ProfileOverview = () => {
  const [admin, setAdmin] = useState({});
  const id = getCookie("id");

  useEffect(() => {
    if (id !== "superadmin") {
      getSpecificAdminData(id).then((data) => {
        setAdmin(data.data)
      })
    }
    else {
      setAdmin(adminData)
    }
  }, [id])

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="w-ful mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12">
        <div className="col-span-4 lg:!mb-0">
          <Banner admin={admin} />
        </div>
        <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-5">
          <General admin={admin} />
        </div>
       
      </div>
     
    
    </div>
  );
};

export default ProfileOverview;
