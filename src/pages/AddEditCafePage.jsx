import React from "react";
import MainLayout from "../components/layouts/MainLayout";
import AddEditCafe from "../components/page-contents/cafes/AddEditCafe";

const AddEditCafePage = () => {
  return (
    <MainLayout page="Add Cafe">
      <AddEditCafe />
    </MainLayout>
  );
};

export default AddEditCafePage;
