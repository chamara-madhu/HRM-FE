import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles//ag-grid.css";
import "ag-grid-community/styles//ag-theme-alpine.css";

const CommonTable = ({ columnDefs, rowData }) => {
  return (
    <div className="ag-theme-alpine common-table-container">
      <AgGridReact rowHeight={50} columnDefs={columnDefs} rowData={rowData} />
    </div>
  );
};

export default CommonTable;
