import React from "react";
import { Form, Select } from "antd";

const SelectInput = ({
  label,
  name,
  value,
  size = "large",
  placeholder = "",
  optionsArr,
  handleChange,
  error,
  isRequired,
  cusStyle = {},
}) => {
  return (
    <Form.Item label={label} required={isRequired}>
      <Select
        size={size}
        name={name}
        value={value}
        placeholder={placeholder}
        optionFilterProp="children"
        onChange={(val) => handleChange(name, val)}
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        options={optionsArr}
        style={cusStyle}
      />
      {error && <p className="cus-error">{error}</p>}
    </Form.Item>
  );
};

export default SelectInput;
