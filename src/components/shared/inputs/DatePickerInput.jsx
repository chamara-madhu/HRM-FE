import React from "react";
import { DatePicker, Form } from "antd";

const DatePickerInput = ({
  label,
  name,
  value,
  size = "large",
  handleChange,
  error,
  isRequired,
}) => {
  return (
    <Form.Item label={label} required={isRequired}>
      <DatePicker
        name={name}
        value={value}
        onChange={(date) => handleChange(name, date)}
        status={error && "error"}
        size={size}
      />
      {error && <p className="cus-error">{error}</p>}
    </Form.Item>
  );
};

export default DatePickerInput;
