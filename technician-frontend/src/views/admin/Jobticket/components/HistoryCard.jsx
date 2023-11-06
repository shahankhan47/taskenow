import React, { useEffect, useState } from "react";
import { FaDollarSign } from "react-icons/fa";
import Card from "components/card";
import NFt4 from "assets/img/nfts/Nft4.png"; // Import your service image
// Import other necessary assets and components as needed

const ServiceProfile = ({data}) => {
  const [editable, setEditable] = useState(false); // State to manage edit mode
  const [serviceData, setServiceData] = useState({
    image: null,
    serviceName: " ",
    serviceCode: " ",
    servicePrice: 0.0,
    category: " ",
   
  });


  useEffect(() => {
    setServiceData({
    image: data.image,
    serviceName: data.serviceName,
    serviceCode: "sc-001",
    servicePrice: data.servicePrice,
    category:data.category,
  
    })
  }, [data]);
  

  const handleEditClick = () => {
    setEditable(true);
  };

  const handleSaveClick = () => {
    setEditable(false);
    // You can update the service data in your database or API here
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setServiceData({
      ...serviceData,
      [name]: value,
    });
  };

  return (
    <Card extra={"mt-3 !z-5 overflow-hidden"}>
      <div className="p-4">
        <div className="text-center mt-4 ">
        <p className="text-sm font-bold text-gray-600 border-1 flex flex-row justify-left gap-x-4 items-center">
            Service Code: {serviceData.serviceCode}
          </p>
          <div className="input-field mt-4 flex flex-row justify-left gap-x-4 items-center">
            <label className="text-navy-700 dark:text-white" htmlFor="serviceName">
              Service Name
            </label>
            {editable ? (
              <input
                type="text"
                id="serviceName"
                name="serviceName"
                value={serviceData.serviceName}
                onChange={handleInputChange}
              />
            ) : (
              <p>{serviceData.serviceName}</p>
            )}
          </div>
          <div className="input-field mt-4 flex flex-row justify-left gap-x-4 items-center">
            <label className="text-navy-700 dark:text-white" htmlFor="category">
              Category
            </label>
            {editable ? (
              <input
                type="text"
                id="category"
                name="category"
                value={serviceData.category}
                onChange={handleInputChange}
              />
            ) : (
              <p>{serviceData.category}</p>
            )}
          </div>
         
  
          <div className="mt-4 flex flex-row justify-left gap-x-4 items-center">
            <label className="text-navy-700 dark:text-white border-1 " htmlFor="servicePrice">
              Service Price (USD)
            </label>
            <div className="flex items-center">
              <FaDollarSign />
              {editable ? (
                <input
                  type="number"
                  step="0.01"
                  id="servicePrice"
                  name="servicePrice"
                  value={serviceData.servicePrice}
                  onChange={handleInputChange}
                />
              ) : (
                <p className="ml-1">{serviceData.servicePrice}</p>
              )}
            </div>
          </div>
          {editable ? (
            <button
              className="flex justify-left mt-4 linear rounded-[12px] bg-lightPrimary px-4 py-2 text-base font-medium text-brand-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20"
              onClick={handleSaveClick}
            >
              Save
            </button>
          ) : (
            <button
              className=" flex justify-left mt-4 linear rounded-[12px] bg-lightPrimary px-4 py-2 text-base font-medium text-brand-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20"
              onClick={handleEditClick}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ServiceProfile;
