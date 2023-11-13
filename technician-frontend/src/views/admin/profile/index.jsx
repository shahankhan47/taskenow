import React, {useEffect, useState} from "react";
import Banner from "./components/Banner";
import General from "./components/General";
import Project from "./components/Project";
import { getSpecificTechnician } from "data/api";
import { getCookie } from "data/cookie";

const ProfileOverview = () => {
  const [technician, setTechnician] = useState({});
  const id = getCookie("id");

  useEffect(() => {
    getSpecificTechnician(id).then((data) => {
      setTechnician(data)
    })
  }, [id])

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="w-ful mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12">
        <div className="col-span-4 lg:!mb-0">
          <Banner technician={technician} />
        </div>
        <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-5">
          <General technician={technician} />
        </div>
        
        <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-4">
          <Project technician={technician} />
        </div>
       
      </div>
     
    
    </div>
  );
};

export default ProfileOverview;
