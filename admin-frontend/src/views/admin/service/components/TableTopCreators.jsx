import React, { useState } from "react";
import { FaDollarSign } from "react-icons/fa";
import Card from "components/card";
import NFt4 from "assets/img/nfts/Nft4.png"; // Import your service image
// Import other necessary assets and components as needed
import { createService } from "../../../../data/api";

const ServiceCreate = () => {
  const [serviceData, setServiceData] = useState({
    service_name: "",
    service_code: "",
    est_price: 0.0,
    category: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setServiceData({
      ...serviceData,
      [name]: value,
    });
  };

  const handleCreateClick = async () => {
    try {
      // Make the API request to create the service
      await createService(serviceData);

      // Optionally, you can reset the form fields after a successful submission
      setServiceData({
        service_name: "",
        service_code: "",
        est_price: 0.0,
        category: "",
      });

      console.log("Service created:", serviceData);
      window.location.reload();
      // Add any success message handling here
    } catch (error) {
      console.error("Error creating service:", error);
      // Handle errors and display an error message if needed
    }
  };

  return (
    <Card extra="mt-3 !z-5 overflow-hidden">
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              className="text-sm text-navy-700 dark:text-white block"
              htmlFor="serviceName"
            >
              Service Name
            </label>
            <input
              type="text"
              id="serviceName"
              name="service_name"
              value={serviceData.service_name}
              onChange={handleInputChange}
              className="w-full text-sm border-b-2 border-gray-300 focus:border-brand-500 focus:outline-none rounded-md px-2 py-1"
            />
          </div>
          <div>
            <label
              className="text-sm text-navy-700 dark:text-white block"
              htmlFor="serviceCode"
            >
              Service Code
            </label>
            <input
              type="text"
              id="serviceCode"
              name="service_code"
              value={serviceData.service_code}
              onChange={handleInputChange}
              className="w-full text-sm border-b-2 border-gray-300 focus:border-brand-500 focus:outline-none rounded-md px-2 py-1"
            />
          </div>
        </div>
        <div>
          <label
            className="text-sm text-navy-700 dark:text-white block"
            htmlFor="category"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={serviceData.category}
            onChange={handleInputChange}
            className="w-full text-sm border-b-2 border-gray-300 focus:border-brand-500 focus:outline-none rounded-md px-2 py-1"
          >
            <option value="">Select a category</option>
            <option value="Electronics">Electronics</option>
            <option value="Household">Household</option>
            <option value="Automobile">Automobile</option>
            <option value="Furniture">Furniture</option>
            <option value="Healthcare">Healthcare</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div>
          <label
            className="text-sm text-navy-700 dark:text-white block"
            htmlFor="servicePrice"
          >
            Service Price (USD)
          </label>
          <div className="flex items-center">
            <FaDollarSign className="text-2xl mr-2" />
            <input
              type="number"
              step="0.01"
              id="servicePrice"
              name="est_price"
              value={serviceData.est_price}
              onChange={handleInputChange}
              className="w-full text-sm border-b-2 border-gray-300 focus:border-brand-500 focus:outline-none rounded-md px-2 py-1"
            />
          </div>
        </div>
        {/* Add more form fields here */}
        <button
          className="mt-4 j linear rounded-[12px] bg-lightPrimary px-4 py-2 text-base font-medium text-brand-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20"
          onClick={handleCreateClick}
        >
          Create
        </button>
      </div>
    </Card>

  );
};

export default ServiceCreate;
