import React from "react";
import MainLayout from "../components/layouts/MainLayout";
import AddEditEmployee from "../components/page-contents/employees/AddEditEmployee";

const AddEditEmployeePage = () => {
  return (
    <MainLayout page="Add Employee">
      <AddEditEmployee />
    </MainLayout>
  );
};

export default AddEditEmployeePage;
