import React, { useEffect, useState } from "react";
import Card from "components/card";
import { getSortedTechnician } from "data/api";

import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

const columnsData = [
  { Header: "ID", accessor: "id" },
  { Header: "Name", accessor: "name" },
  { Header: "Rating", accessor: "rating" },
  { Header: "Distance", accessor: "distance" },
  { Header: "Status", accessor: "status" }
];

const CheckTable = ({onClose, isDarkMode, job, setJob}) => {
  const [techList, setTechList] = useState([])

  useEffect(() => {
    const request = {
      zip: job.customerZip,
      state: job.customerState
    }
    getSortedTechnician(request).then(list => {
      const technicianList = list.map(technician => {
        return {
          id: technician?.taskNow_unique_id || "tecnician not found",
          name: technician?.firstName || "tecnician not found",
          rating: technician?.ratingsAndReviews || "tecnician not found",
          distance: technician?.miles_distance.toString() || "tecnician not found"
        }
      })
      setTechList(technicianList)
    })
  }, [])

  const tableInstance = useTable(
    {
      columns: columnsData,
      data: techList,
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
    initialState,
  } = tableInstance;
  initialState.pageSize = 11;

  const assignTechnician = async (row) => {    
    console.log(row);
    console.log(job);
  }

  return (
    <Card extra={"w-full h-full sm:overflow-auto px-6"}>
      <header className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Technician List
        </div>
        <button
            onClick={onClose}
            className={`mt-4 ml-0 ${
            isDarkMode ? "bg-gray-600 hover:bg-gray-700" : "bg-gray-400 hover:bg-gray-500"
            } text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:ring focus:ring-gray-300`}
        >
            Close
        </button>
      </header>

      <div className="mt-8" style={{ maxHeight: "400px", overflowY: "auto" }}>
        {/* Apply maxHeight and overflowY styles to create the scrollable container */}
        <table {...getTableProps()} className="w-full" variant="simple" color="gray-500" mb="24px">
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="border-b border-gray-200 pr-16 pb-[10px] text-start dark:!border-navy-700"
                    key={index}
                  >
                    <div className="text-xs font-bold tracking-wide text-gray-600 lg:text-xs">
                      {column.render("Header")}
                    </div>
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
                  {row.cells.map((cell, cellIndex) => {
                    let data = "";
                    if (cell.column.Header === "ID") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                          {cell.value}
                        </p>
                      );
                    }
                    else if (cell.column.Header === "Name") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                          {cell.value}
                        </p>
                      );
                    }
                    else if (cell.column.Header === "Rating") {
                        data = (
                          <p className="text-sm font-bold text-navy-700 dark:text-white">
                            {cell.value}
                          </p>
                        );
                    }
                    else if (cell.column.Header === "Distance") {
                        data = (
                          <p className="text-sm font-bold text-navy-700 dark:text-white">
                            {cell.value}
                          </p>
                        );
                    }
                    else if (cell.column.Header === "Status") {
                        data = (
                            <button
                            className="px-2 py-2 text-blue-800 bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                            onClick={() => assignTechnician(row.original)}
                          >
                            Assign
                          </button>
                        );
                    }
                    return (
                      <td
                        {...cell.getCellProps()}
                        key={cellIndex}
                        className="pt-[14px] pb-[16px] sm:text-[14px]"
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
    </Card>
  );
};

export default CheckTable;
