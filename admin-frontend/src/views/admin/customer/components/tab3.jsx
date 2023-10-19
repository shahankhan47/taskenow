import React from 'react';

const UserPayment = ({ values, handleChange, prevStep }) => {
  return (
    <div>
      <form className="mt-4 space-y-4">
        {/* Add payment-related form fields here */}
        <div>
          <label className="block text-gray-700">Account Number</label>
          <input
            type="text"
            className="w-full text-sm border-b-2 border-gray-300 focus:border-brand-500 focus:outline-none rounded-md px-2 py-1"
            onChange={handleChange('AccountNumber')}
            value={values.accountNumber}
          />
        </div>
        <div>
          <label className="block text-gray-700">Routing Number</label>
          <input
            type="text"
            className="w-full text-sm border-b-2 border-gray-300 focus:border-brand-500 focus:outline-none rounded-md px-2 py-1"
            onChange={handleChange('routingNumber')}
            value={values.routingNumber}
          />
        </div>
        <div>
          <label className="block text-gray-700">SSN Number ( Last 4 Digits ) </label>
          <input
            type="text"
            className="w-full text-sm border-b-2 border-gray-300 focus:border-brand-500 focus:outline-none rounded-md px-2 py-1"
            onChange={handleChange('ssn')}
            value={values.ssn}
          />
        </div>
      </form>
     
    </div>
  );
};

export default UserPayment;
