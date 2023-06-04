import React from "react";
import MainLayout from "../components/layouts/MainLayout";
import Main from "../components/page-contents/employees/Main";

const EmployeesPage = () => {
  return (
    <MainLayout page="Employees">
      <Main />
    </MainLayout>
  );
};

export default EmployeesPage;
