import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import CommonButton from "./buttons/CommonButton";

const PageHeader = ({ pageTitle, btnLabel, handleBtn, children }) => {
  return (
    <div className="page-header-container">
      <h1 className="page-title">{pageTitle}</h1>
      {btnLabel && (
        <div className="action-container">
          {children}
          <CommonButton
            type="primary"
            label={btnLabel}
            handleBtn={handleBtn}
            size="large"
            icon={<PlusOutlined />}
          />
        </div>
      )}
    </div>
  );
};

export default PageHeader;
