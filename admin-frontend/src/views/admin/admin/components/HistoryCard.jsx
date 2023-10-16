import React, { useState,useEffect } from 'react';
import Card from 'components/card';

// Import your CreateTech here
import CreateTech from './CrT2';
import { getAdminData } from 'data/api';

const TechnicianList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTechnician, setSelectedTechnician] = useState(null);
  const [historyData,setHistoryData] = useState([]);

  const handleOpenModal = (technician) => {
    setSelectedTechnician(technician);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    getAdminData().then(response => {
      setHistoryData(response.data);
    })
    setSelectedTechnician(null);
    setIsModalOpen(false);
  };


  useEffect(() => {
    // Call API to fetch service list
    getAdminData().then(response => {
      setHistoryData(response.data);
    })
  },[]);




  return (
    <div>
      {historyData.length> 0 && <Card extra="mt-8 ml-2 mt-2 h-[82vh] !z-5 overflow-y-scroll ">
        {/* HistoryCard Header */}
        <div className="flex items-center justify-between rounded-t-3xl p-3">
          <div className="text-lg font-bold text-navy-700 dark:text-white">
            History
          </div>
        </div>

        {/* History CardData */}
        {historyData.map((data, index) => (
          <div
            key={index}
            className="flex h-fullw-full items-start justify-between bg-white px-3 py-[20px] hover:shadow-2xl dark:!bg-navy-800 dark:shadow-none dark:hover:!bg-navy-700"
          >
            {/* Technician details */}
            <div className="flex items-center gap-3">
              <div className="flex h-16 w-16 items-center justify-center">
              <h5 className="text-base font-bold text-navy-700 dark:text-white">
                  {index+1}
                </h5>
              </div>
              <div className="flex flex-col">
                <h5 className="text-base font-bold text-navy-700 dark:text-white">
                  {data.firstName} {data.lastName}
                </h5>
                <p className="mt-1 text-sm font-normal text-gray-600">
                  {data.email}
                </p>
              </div>
            </div>

           
            <button
              onClick={() => handleOpenModal(data)}
              className="linear mx-4 rounded-[20px] bg-lightPrimary px-4 py-2 text-base font-medium text-brand-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20"
            >
              Edit
            </button>
          </div>
        ))}

        {/* Technician Details Modal */}
        {isModalOpen && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-gray-800 bg-opacity-70">
            <div className="bg-white p-4 rounded-lg w-1/2">
              <button
                onClick={handleCloseModal}
                className="absolute top-2 right-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Close
              </button>
              <CreateTech
                initialValues={selectedTechnician}
                onCancel={handleCloseModal}
             
              />
            </div>
          </div>
        )}
      </Card>}
    </div>
  );
};

export default TechnicianList;
