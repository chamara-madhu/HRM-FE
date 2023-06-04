import React from "react";
import { Form, Select } from "antd";

const SelectInput = ({
  label,
  name,
  value,
  placeholder = "",
  optionsArr,
  handleChange,
  error,
  isRequired,
}) => {
  return (
    <Form.Item label={label} required={isRequired}>
      <Select
        name={name}
        value={value}
        placeholder={placeholder}
        optionFilterProp="children"
        onChange={(val) => handleChange(name, val)}
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        options={optionsArr}
      />
      {error && <p className="cus-error">{error}</p>}
    </Form.Item>
  );
};

export default SelectInput;
