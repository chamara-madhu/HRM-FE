import React from "react";
import Navbar from "../shared/Navbar";
import BreadcrumbComp from "../shared/BreadcrumbComp";

const MainLayout = ({ page, children }) => {
  return (
    <>
      <Navbar />
      {page && <BreadcrumbComp page={page} />}
      <div className="content-container">{children}</div>
    </>
  );
};

export default MainLayout;
