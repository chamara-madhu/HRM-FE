import React, { memo } from "react";
import { Form, Input } from "antd";

const TextareaField = ({
  label,
  rows = 5,
  name,
  value,
  placeholder = "",
  handleChange,
  isRequired,
  error,
}) => {
  return (
    <Form.Item label={label} required={isRequired}>
      <Input.TextArea
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        rows={rows}
        status={error && "error"}
      />
      {error && <p className="cus-error">{error}</p>}
    </Form.Item>
  );
};

export default memo(TextareaField);
