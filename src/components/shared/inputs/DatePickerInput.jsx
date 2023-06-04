import React from "react";
import { DatePicker, Form } from "antd";

const DatePickerInput = ({
  label,
  name,
  value,
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
      />
      {error && <p className="cus-error">{error}</p>}
    </Form.Item>
  );
};

export default DatePickerInput;
