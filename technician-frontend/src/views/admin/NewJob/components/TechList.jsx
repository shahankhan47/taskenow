import React, { useState } from 'react';
import InstallerForm from './InstallerForm'; // Import your InstallerForm component
import Modal from './Modal'; // You'll need to create a Modal component

const TechnicianList = ({ technicians }) => {
  const [selectedTechnician, setSelectedTechnician] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (technician) => {
    setSelectedTechnician(technician);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTechnician(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">List of Technicians</h1>
      <ul className="space-y-4">
        {technicians.map((technician) => (
          <li key={technician._id}>
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">
                  {technician.firstName} {technician.lastName}
                </h2>
                <p>Email: {technician.email}</p>
                <p>State: {technician.state}</p>
                {/* Add more technician details here */}
              </div>
              <button
                onClick={() => openModal(technician)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <InstallerForm
            initialValues={selectedTechnician}
            onCancel={closeModal}
            onSubmit={(updatedTechnician) => {
              // Handle the updated technician data here
              closeModal();
            }}
          />
        </Modal>
      )}
    </div>
  );
};

export default TechnicianList;
