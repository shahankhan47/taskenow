import React, { useMemo } from "react";
import CardMenu from "components/card/CardMenu";
import Card from "components/card";

import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";


const ColumnsTable = () => {
  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => rowData, [rowData]);

  const tableInstance = useTable(
    {
      columns,
      data,
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

  return (
    <Card extra={"w-full h-full sm:overflow-auto px-6"}>
      <header className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Customers
        </div>
      </header>

      <div className="mt-5" style={{ maxHeight: "400px"}}>
        {/* Apply maxHeight and overflowY styles to create the scrollable container */}
        <table
          {...getTableProps()}
          className="w-full"
          variant="simple"
          color="gray-500"
          mb="24px"
        >
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
                    return (
                      <td
                        {...cell.getCellProps()}
                        key={cellIndex}
                        className="pt-[14px] pb-[16px] sm:text-[14px]"
                      >
                        {cell.render("Cell")}
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


export default ColumnsTable;


const rowData = [
  {
    Service: "Complete Tune up & PC repair",
    Price: "$150",
  },
  {
    Service: "Diagnostic Testing",
    Price: "$40",
  },
  {
    Service: "Laptop hardware repair",
    Price: "$30",
  },
  {
    Service: "PC Hardware repair",
    Price: "$30",
  },
  {
    Service: "Software installation",
    Price: "$25",
  },
  {
    Service: "Mobile Repair",
    Price: "$40",
  },
  {
    Service: "Data Recovery",
    Price: "$100+",
  },
  {
    Service: "Wireless Network Installation",
    Price: "$100+",
  },
  {
    Service: "PC Tuneup",
    Price: "$70",
  },
  {
    Service: "Virus Removal",
    Price: "$130",
  },
  {
    Service: "Operating system formatting",
    Price: "$100",
  },
  {
    Service: "Computer assembly",
    Price: "$100",
  },
  {
    Service: "Hardware upgrade",
    Price: "$50",
  },
  {
    Service: "Small business Support (Starting at $350 monthly)",
    Price: "Varies",
  },
  {
    Service: "Memory (RAM) upgrade",
    Price: "$85",
  },
  {
    Service: "Laptop screen repair",
    Price: "$150 or higher",
  },
  // Add more services here if needed
];


const columnsData = [
  { Header: "User Id",
  accessor: "Code",},
  {
    Header: "User Name",
    accessor: "Service",
  },
  {
    Header: "Latest Job",
    accessor: "Category",
  },
  {
    Header: "Amount Paid",
    accessor: "Price",
  },
];