import React, { useEffect, useState } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import Card from "components/card";
import {
  MdCheckCircle,
  MdPending,
  MdCancel,
  MdAssignmentLate
} from "react-icons/md";
import Progress from "components/progress";
import JobDetailsModal from "./jobDetailsModel";
import { getJobsofType, deleteJob } from "data/api";

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
    technicianAssigned: true,
    technicianName: "Technician 1",
  }
];

getJobsofType({type: "Inspection"}).then((jobs) => {
  tableData = tableData.concat(jobs.data)
})

const columnsData = [
  {
    Header: "JOB ID",
    accessor: "jobId",
  },
  {
    Header: "SERVICE",
    accessor: "service",
  },
  {
    Header: "DATE",
    accessor: "date",
  },
  {
    Header: "STATUS",
    accessor: "status",
  },
  {
    Header: "SEE DETAILS",
    accessor: "details",
  },
];

const DevelopmentTable = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState({});
  const [jobData, setJobData] = useState([])

  useEffect(() => {
    getJobsofType({type: "Inspection"}).then((jobs) => {
      setJobData(jobs.data)
    })
  }, [])

  const tableInstance = useTable(
    {
      columns: columnsData,
      data: jobData,
      initialState: { pageSize: 5 }, // Set the initial page size
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
  } = tableInstance;

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
    <Card extra={"w-full h-full p-4 sm:overflow-x-auto"}>
      <div className="relative flex items-center justify-between">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Job ( Inspection )
        </div>
      </div>

      <div className="mt-8 h-full overflow-x-scroll xl:overflow-hidden">
        <table {...getTableProps()} className="w-full">
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={index}
                    className="border-b border-gray-200 pr-24 pb-[10px] text-start dark:!border-navy-700"
                  >
                    <p className="text-xs tracking-wide text-gray-600">
                      {column.render("Header")}
                    </p>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => {
                    let data = "";
                    if (cell.column.Header === "NAME") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                          {cell.value}
                        </p>
                      );
                    } else if (cell.column.Header === "SERVICE") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                          {cell.value}
                        </p>
                      );
                    } else if (cell.column.Header === "DATE") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                          {cell.value}
                        </p>
                      );
                    } else if (cell.column.Header === "PROGRESS") {
                      data = (
                        <div className="flex items-center gap-3">
                          <p className="text-sm font-bold text-navy-700 dark:text-white">
                            {cell.value}%
                          </p>
                          <Progress width="w-[68px]" value={cell.value} />
                        </div>
                      );
                    } else if (cell.column.Header === "JOB ID") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                          {cell.value}
                        </p>
                      );
                    } else if (cell.column.Header === "STATUS") {
                      data = (
                        <div className="flex items-center gap-2">
                          <div className={`rounded-full text-xl`}>
                            {cell.value === "Accepted" ? (
                              <MdCheckCircle className="text-green-500" />
                            ) : cell.value === "Pending" ? (
                              <MdPending className="text-yellow-500" />
                            ) : cell.value === "Declined" ? (
                              <MdCancel className="text-red-500" />
                            ) : cell.value === "Unassigned" ? (
                              <MdAssignmentLate className="text-gray-500" />
                            ) : null}
                          </div>
                          <p className="text-sm font-bold text-navy-700 dark:text-white">
                            {cell.value}
                          </p>
                        </div>
                      );
                    } else if (cell.column.Header === "SEE DETAILS") {
                      data = (
                        <button
                          className="px-2 py-2 text-blue-800 bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                          onClick={() => openModal(row.original)}
                        >
                          Details
                        </button>
                      );
                    }
                    return (
                      <td
                        className="pt-[14px] pb-[18px] sm:text-[14px]"
                        {...cell.getCellProps()}
                        key={index}
                      >
                        {data}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Display the modal when showModal is true */}
      <JobDetailsModal isOpen={showModal} onClose={closeModal} job={selectedJob} deleteJob={deleteSelectedJob} />
    </Card>

  );
};


export default DevelopmentTable;