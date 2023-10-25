import {
  columnsDataDevelopment,
  columnsDataCheck,
} from "./variables/columnsData";
import tableDataDevelopment from "./variables/tableDataDevelopment.json";
import tableDataCheck from "./variables/tableDataCheck.json";
import DevelopmentTable from "./components/inspectionJob/inspectionJobTable";
import CheckTable from "./components/repairJob/repairJobTable";

const Tables = () => {
  return (
    <div>
      <div>
        <DevelopmentTable
          columnsData={columnsDataDevelopment}
          tableData={tableDataDevelopment}
        />
        <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} />
      </div>
    </div>
  );
};

export default Tables;
