import Card from "components/card";
import React from "react";

const General = ({admin}) => {
  return (
    <Card extra={"w-full h-full p-3"}>
      {/* Header */}
      <div className="mt-2 mb-8 w-full">
        <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
          General Information
        </h4>
        <p className="mt-2 px-2 text-base text-gray-600">
          {admin.description !== "" ? admin.description : "Admin description will appear here once it's entered into our database."}
        </p>
      </div>
      {/* Cards */}
      <div className="grid grid-cols-2 gap-4 px-2">
        <div className="flex flex-col items-start justify-top rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">TaskeNow ID</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
          {admin.taskNow_unique_id}
          </p>
        </div>

        <div className="flex flex-col justify-top rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Email ID</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
          {admin.email}
          </p>
        </div>

        <div className="flex flex-col items-start justify-top rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Address</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
          {admin.addressLine1} {admin.city} {admin.state} {admin.zip}
          </p>
        </div>

        <div className="flex flex-col justify-top rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Phone Number</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
          {admin.phoneNumber}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default General;
