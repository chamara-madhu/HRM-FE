import React, { memo } from "react";
import { Form, Input } from "antd";

const TextField = ({
  label,
  type = "text",
  name,
  value,
  placeholder = "",
  handleChange,
  isRequired,
  error,
}) => {
  return (
    <Form.Item label={label} required={isRequired}>
      <Input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        status={error && "error"}
      />
      {error && <p className="cus-error">{error}</p>}
    </Form.Item>
  );
};

export default memo(TextField);
