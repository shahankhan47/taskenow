import React, { useState, useEffect } from 'react';
import { getserviceList } from 'data/api';

const InstallerPayment = ({ values, handleChange, prevStep }) => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    // Call API to fetch service list
    getserviceList().then(servs => {
      const response = [];
      servs.data.map((service) => {
        response.push(service?.service_name);
      })
      setServices(response);
    })
  },[]);

  return (
    <div>
      <form className="mt-4 space-y-4">
        {/* Add payment-related form fields here */}
        <div>
          <label className="block text-gray-700">Service</label>
          <select
            id="services"
            name="services"
            value={values.services}
            onChange={handleChange('services')}
            className="w-full text-sm border-b-2 border-gray-300 focus:border-brand-500 focus:outline-none rounded-md px-2 py-1"
          >
            <option value="">Select a category</option>
            {services.map((service, index) => {
              return (<option key={index} value={service}>{service}</option>)
            })}
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Description</label>
          <input
            type="text"
            className="w-full text-sm border-b-2 border-gray-300 focus:border-brand-500 focus:outline-none rounded-md px-2 py-1"
            onChange={handleChange('description')}
            value={values.description}
          />
        </div>
        <div>
          <label className="block text-gray-700">Job Type</label>
          <select
            className="w-full text-sm border-b-2 border-gray-300 focus:border-brand-500 focus:outline-none rounded-md px-2 py-1"
            onChange={handleChange('jobType')}
            value={values.jobType}
          >
            <option value="Inspection">Inspection</option>
            <option value="Repairing">Repairing</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Job Status</label>
          <select
            className="w-full text-sm border-b-2 border-gray-300 focus:border-brand-500 focus:outline-none rounded-md px-2 py-1"
            onChange={handleChange('jobStatus')}
            value={values.jobStatus}
          >
            <option value="Unassigned">Unassigned</option>
            <option value="Pending">Pending</option>
            <option value="Accepted">Accepted</option>
            <option value="Declined">Declined</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Cost</label>
          <input
            type="text"
            className="w-full text-sm border-b-2 border-gray-300 focus:border-brand-500 focus:outline-none rounded-md px-2 py-1"
            onChange={handleChange('cost')}
            value={values.cost}
          />
        </div>
        <div>
          <label className="block text-gray-700">Payment Status</label>
          <select
            className="w-full text-sm border-b-2 border-gray-300 focus:border-brand-500 focus:outline-none rounded-md px-2 py-1"
            onChange={handleChange('paymentStatus')}
            value={values.paymentStatus}
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Payment Id</label>
          <input
            type="text"
            className="w-full text-sm border-b-2 border-gray-300 focus:border-brand-500 focus:outline-none rounded-md px-2 py-1"
            onChange={handleChange('paymentId')}
            value={values.paymentId}
            placeholder='leave blank if unknown'
          />
        </div>
      </form>
    </div>
  );
};

export default InstallerPayment;
