import React from "react";
import { Button } from "antd";

const CommonButton = ({
  type,
  label,
  handleBtn,
  size,
  icon,
  isDanger = false,
  isLoading = false,
  cusStyle = {},
}) => {
  return (
    <Button
      type={type}
      onClick={handleBtn}
      danger={isDanger}
      loading={isLoading}
      size={size}
      icon={icon}
      style={cusStyle}
    >
      {label}
    </Button>
  );
};

export default CommonButton;
