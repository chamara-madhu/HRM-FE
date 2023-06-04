import React from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

const BreadcrumbComp = ({ page }) => {
  return (
    <Breadcrumb className="breadcrumb-container">
      <Breadcrumb.Item>
        <Link to="/">Home</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>{page}</Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default BreadcrumbComp;
