import React, { useEffect, useState } from "react";

import Card from "components/card";

import JobDetailsModal from "./jobDetailsModel";
import { getJobsofType, deleteJob } from "data/api";
import MUIDataTable from "mui-datatables";

let tableData = [
  {
    jobId: "12345",
    service: "Service 1",
    date: "2023-09-09",
    status: "Accepted",
    details: "Details 1",
    customerName: "John Doe",
    customerAddress: "123 Main St",
    customerPhoneNumber: "555-555-5555",
    customerEmail: "john@example.com",
    jobDetails: "Job details for Service 1",
    jobAssignedStatus: "Assigned",
    cost: "$1000",
    technicianAssigned: false,
    technicianName: "",
  }
];

getJobsofType({type: "Inspection"}).then((jobs) => {
  tableData = tableData.concat(jobs.data)
})



const DevelopmentTable = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState({});
  const [jobData, setJobData] = useState([])

  useEffect(() => {
    getJobsofType({type: "Inspection"}).then((jobs) => {
      setJobData(jobs.data)
    })
  }, [])
  
  const columnsData = [
    {
      name: "jobId",
      label: "JOB ID",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "service",
      label: "SERVICE",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "date",
      label: "DATE",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "status",
      label: "STATUS",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "details",
      label: "SEE DETAILS",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <button
              className="px-2 py-2 text-blue-800 bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
              onClick={() => openModal(tableData[tableMeta.rowIndex])}
            >
              Details
            </button>
          );
        },
      },
    },
  ];



  const deleteSelectedJob = async () => {
    await deleteJob(selectedJob);
    getJobsofType({type: "Inspection"}).then((jobs) => {
      setJobData(jobs.data)
    });
    setShowModal(false);
    setSelectedJob({});
  }

  const openModal = (row) => {
    setSelectedJob(row);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedJob({});
  };

  return (
    <Card extra={"w-full h-full p-4 sm:overflow-x-auto "}>
    <div className="mt-8 h-full overflow-x-scroll xl:overflow-hidden">
      <MUIDataTable
        title={"Inspection Jobs"}
        data={tableData}
        columns={columnsData}
        options={{
          selectableRows: "none", // Disable row selection
        }}
      />
    </div>

    {/* Display the modal when showModal is true */}
    <JobDetailsModal 
    isOpen={showModal} 
    onClose={closeModal} 
    job={selectedJob}
    deleteJob={deleteSelectedJob}
    setJob={setSelectedJob}
    />
  </Card>
  );
};


export default DevelopmentTable;