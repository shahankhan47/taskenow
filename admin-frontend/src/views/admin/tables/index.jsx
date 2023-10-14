// import CheckTable from "./components/CheckTable";

// import {
//   columnsDataDevelopment,
//   columnsDataCheck,
//   columnsDataColumns,
//   columnsDataComplex,
// } from "./variables/columnsData";
// import tableDataDevelopment from "./variables/tableDataDevelopment.json";
// import tableDataCheck from "./variables/tableDataCheck.json";
// import tableDataColumns from "./variables/tableDataColumns.json";
// import tableDataComplex from "./variables/tableDataComplex.json";
// import DevelopmentTable from "./components/DevelopmentTable";
// import ColumnsTable from "./components/ColumnsTable";
// import ComplexTable from "./components/ComplexTable";

// const Tables = () => {
//   return (
//     <div>
//       <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
//         <DevelopmentTable
//           columnsData={columnsDataDevelopment}
//           tableData={tableDataDevelopment}
//         />
//         <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} />
//       </div>

//       <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
//         <ColumnsTable
//           columnsData={columnsDataColumns}
//           tableData={tableDataColumns}
//         />

//         <ComplexTable
//           columnsData={columnsDataComplex}
//           tableData={tableDataComplex}
//         />
//       </div>
//     </div>
//   );
// };

// export default Tables;



const Tables = () => {
  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">
      <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">


        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {/* Placeholder for Recently Added NFTs */}
          <div className="bg-gray-200 p-4 rounded-lg">
            {/* Content: This Section is under progress, this will be done on business end approval */}
            <p className="text-red-500 text-center font-bold">
              This Section is under progress
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tables;
