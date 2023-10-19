import React from 'react';

const InstallerLicense = ({ values, handleChange }) => {
  // Define the enum values
  const enumValues = ['Technician', 'Customer', 'General', 'Payment', 'Jobs', 'Admin'];

  const handleCheckboxChange = (enumValue) => (event) => {
    let updatedValues = {}; // Create a copy of the values object
    updatedValues[enumValue] = event.target.checked; // Update the value for the corresponding enumValue
    let adminAccess = {'Admin': updatedValues}
    handleChange(adminAccess)(event);
  };

  return (
    <div>
      <form className="mt-4 space-y-4">
        {enumValues.map((enumValue) => (
          <div key={enumValue}>
            <label className="block text-gray-700">
              <input
                type="checkbox"
                onChange={handleCheckboxChange(enumValue)}
                checked={values.includes(enumValue)}
              />{` ${enumValue}`}
            </label>
          </div>
        ))}
      </form>
    </div>
  );
};

export default InstallerLicense;
