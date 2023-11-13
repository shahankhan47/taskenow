import Card from "components/card";
import React from "react";

const General = ({technician}) => {
  return (
    <Card extra={"w-full h-full p-3"}>
      {/* Header */}
      <div className="mt-2 mb-8 w-full">
        <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
          General Information
        </h4>
        <p className="mt-2 px-2 text-base text-gray-600">
          {technician.description}
        </p>
      </div>
      {/* Cards */}
      <div className="grid grid-cols-2 gap-4 px-2">
        <div className="flex flex-col items-start justify-top rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">TaskeNow ID</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
          {technician.taskNow_unique_id}
          </p>
        </div>

        <div className="flex flex-col justify-top rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Email ID</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
          {technician.email}
          </p>
        </div>

        <div className="flex flex-col items-start justify-top rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Address</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
          {technician.addressLine1} {technician.city} {technician.state} {technician.zip}
          </p>
        </div>

        <div className="flex flex-col justify-top rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Total Bookings</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
          {technician.Number_of_bookings}
          </p>
        </div>

        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">License Number</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
          {technician.licenseNumber}
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">License Expiration</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
          {new Date(technician.licenseExpirationDate).toDateString()}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default General;
